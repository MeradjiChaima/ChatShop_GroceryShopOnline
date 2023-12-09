const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// Get products by shop ID
router.get("/:shopId", async (req, res) => {
  const shopId = parseInt(req.params.shopId, 10);

  try {
    const products = await Product.find({ shopId: shopId });
    res.json(products);
    console.log("products", products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
