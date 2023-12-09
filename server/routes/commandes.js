const express = require("express");
const router = express.Router();
const Shops = require("../models/commandeModel");

router.get("/", async (req, res) => {
  try {
    const commandes = await commandes.find();
    res.json(commandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
