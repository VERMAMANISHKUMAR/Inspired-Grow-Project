const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  features: [String],
  image: { type: String, default: '' },
});

const subSubcategorySchema = new mongoose.Schema({
  name: { type: String, },
  image: { type: String, default: '' },
  features: [String],
  products: [productSchema],
});

const subcategorySchema = new mongoose.Schema({
  name: { type: String, },
  image: { type: String, default: '' },
  features: [String],
  subSubcategories: [subSubcategorySchema],
});

const categorySchema = new mongoose.Schema({
  name: { type: String,},
  image: { type: String, default: '' },
  features: [String],
  subcategories: [subcategorySchema],
});

module.exports = mongoose.model('Category', categorySchema);


