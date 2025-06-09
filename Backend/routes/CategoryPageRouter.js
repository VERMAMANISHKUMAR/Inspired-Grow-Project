// backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryPageController');

// Category routes
router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);

// Subcategory routes
router.post('/categories/:categoryId/subcategories', categoryController.createSubcategory);

// Sub-subcategory routes
router.post(
  '/categories/:categoryId/subcategories/:subcategoryId/sub-subcategories',
  categoryController.createSubSubcategory
);

// Product routes
router.post(
  '/categories/:categoryId/subcategories/:subcategoryId/sub-subcategories/:subSubcategoryId/products',
  categoryController.createProduct
);

module.exports = router;