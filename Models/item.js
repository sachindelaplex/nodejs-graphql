const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  oldprice: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Item", itemSchema);
