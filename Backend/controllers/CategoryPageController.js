// backend/controllers/categoryController.js
const Category = require('../models/CategoryPageModel');
const { v4: uuidv4 } = require('uuid');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, image, features } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const category = new Category({
      name,
      image: image || '',
      features: features || [],
      subcategories: [],
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, image, features } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Subcategory name is required' });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.subcategories.push({
      name,
      image: image || '',
      features: features || [],
      subSubcategories: [],
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new sub-subcategory
exports.createSubSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;
    const { name, image, features } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Sub-subcategory name is required' });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const subcategory = category.subcategories.id(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    subcategory.subSubcategories.push({
      name,
      image: image || '',
      features: features || [],
      products: [],
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating sub-subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { categoryId, subcategoryId, subSubcategoryId } = req.params;
    const { name, description, price, features, image } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Name, description, and price are required' });
    }
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const subcategory = category.subcategories.id(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    const subSubcategory = subcategory.subSubcategories.id(subSubcategoryId);
    if (!subSubcategory) {
      return res.status(404).json({ message: 'Sub-subcategory not found' });
    }
    const product = {
      id: uuidv4(),
      name,
      description,
      price: parseFloat(price),
      features: features || [],
      image: image || '',
    };
    subSubcategory.products.push(product);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
