import axios from "axios";
import { JSDOM } from "jsdom";

/**
 * Fetches product information from Amazon based on the provided keyword.
 * @param {string} keyword - The keyword to search for products.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of product objects.
 */
export const fetchProduct = async (keyword) => {
    try {
        const response = await axios.get(
            `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`,
        );
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        const searchResults = document.querySelectorAll(".s-result-item");

        const products = [];

        searchResults.forEach((result) => {
            const titleElement = result.querySelector("h2 .a-link-normal");
            const title = titleElement?.textContent.trim();
            const url = titleElement?.getAttribute("href");
            const rating = result
                .querySelector(".a-icon-alt")
                ?.textContent.trim();
            const reviews = result
                .querySelector(".a-size-base")
                ?.textContent.trim();
            const priceWhole = result
                .querySelector(".a-price-whole")
                ?.textContent.trim();
            const priceFraction = result
                .querySelector(".a-price-fraction")
                ?.textContent.trim();
            const imageUrl = result
                .querySelector(".s-image")
                ?.getAttribute("src");

            if (title && priceWhole) {
                const product = {
                    title: title || "N/A",
                    url: url ? `https://www.amazon.com${url}` : "N/A",
                    rating: rating || "N/A",
                    reviews: reviews || "N/A",
                    price: `${priceWhole}.${priceFraction || "00"}`,
                    image: imageUrl || "N/A",
                };
                products.push(product);
            }
        });

        return products;
    } catch (error) {
        console.error("Error fetching product: ", error);
        return null;
    }
};
