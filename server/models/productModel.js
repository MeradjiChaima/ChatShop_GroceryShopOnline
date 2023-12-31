const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  shopId: { type: Number, required: true }, // Reference to the shop
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
