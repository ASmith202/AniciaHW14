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
  type: { // Add info for the shoe type (e.g., Nike, Adidas)
    type: String,
    required: true,
  },
  color: { // Add color info for shoe color
    type: String,
    required: true,
  },
});

// Creating the Shoe model based on the schema
const Shoe = mongoose.model("Shoe", ShoeSchema);
