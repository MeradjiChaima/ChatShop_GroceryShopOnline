const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  idshop: { type: Number, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  appreciations: { type: Number, required: true },
  adresse: { type: String, required: true },
  workTime: { type: String, required: true },
  wilaya: { type: String, required: true },
  commune: { type: String, required: true },
});

const Shops = mongoose.model("shops", shopSchema);

module.exports = Shops;
