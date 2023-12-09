const express = require("express");
const router = express.Router();
const Shops = require("../models/shopModel");

// Get all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shops.find();
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
