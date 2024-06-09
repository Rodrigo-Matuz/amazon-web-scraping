import express from "express";
import { fetchProduct } from "../../utils/scrape.js";

const router = express.Router();

/* Route handler for fetching products based on keyword query parameter. */
router.get("/", async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res
            .status(400)
            .json({ error: "Keyword query parameter is required" });
    }

    try {
        const products = await fetchProduct(keyword);
        if (products) {
            res.json(products);
        } else {
            res.status(500).json({ error: "Failed to fetch products" });
        }
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({
            error: "An error occurred while fetching products",
        });
    }
});

export default router;
