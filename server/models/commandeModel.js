const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  shopId: { type: Number, required: true },
  products: {},
});

const Commande = mongoose.model("commande", commandeSchema);

module.exports = Commande;
