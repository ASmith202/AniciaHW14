const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const Shoe = mongoose.model("Shoe", ShoeSchema);
module.exports = Shoe;