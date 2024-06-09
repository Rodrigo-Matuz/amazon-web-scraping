/* eslint-env browser */

const productContainer = document.getElementById("product-container");
const searchForm = document.getElementById("search-form");
const searchButton = searchForm.querySelector("button");

/**
 * Creates a product card element and appends it to the product container.
 * @param {Object} product - The product object containing information such as image, title, url, price, rating, and reviews.
 */
function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    card.appendChild(image);

    const details = document.createElement("div");
    details.classList.add("product-details");

    const titleLink = document.createElement("a");
    titleLink.href = product.url;
    titleLink.textContent = product.title;
    titleLink.target = "_blank";
    details.appendChild(titleLink);

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    details.appendChild(price);

    const rating = document.createElement("p");
    rating.textContent = `Avaliação: ${product.rating}`;
    details.appendChild(rating);

    const reviews = document.createElement("p");
    reviews.textContent = `Avaliações: ${product.reviews}`;
    details.appendChild(reviews);

    card.appendChild(details);

    productContainer.appendChild(card);
}

/**
 * Retrieves product information from the server based on the keyword entered by the user
 * and displays the product cards in the product container.
 * @param {Event} event - The submit event triggered by the search form.
 */
async function fetchProducts(event) {
    event.preventDefault();
    searchButton.disabled = true; // Disable the button

    try {
        const keyword = document.getElementById("search").value;
        const response = await fetch(
            `/api/scrape?keyword=${encodeURIComponent(keyword)}`,
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();
        productContainer.innerHTML = "";

        products.forEach((product) => {
            createProductCard(product);
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        // Handle error - display error message to the user or log it.
    } finally {
        searchButton.disabled = false; // Re-enable the button
    }
}

// Attach event listener to the search form
searchForm.addEventListener("submit", fetchProducts);
