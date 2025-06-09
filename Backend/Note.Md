# CategoryPage
# Category
## Post or Get Api = http://localhost:5000/api/categories
JSON date Like
{
  "name": "Stationery",
  "image": "http://example.com/image.png",
  "features": ["Durable", "Eco-friendly"]
}
# SubCategory
# http://localhost:5000/api/categories/:categoryId/subcategories
{
  "name": "Pens",
  "image": "http://example.com/pen.png",
  "features": ["Smooth writing"]
}
# Post Method Api:- http://localhost:5000/api/categories/:categoryId/subcategories/:subcategoryId/sub-subcategories
{
  "name": "Ballpoint Pens",
  "image": "http://example.com/ballpoint.png",
  "features": ["Refillable"]
}
**Purpose: Create a new product under a specific sub-subcategory.**
## http://localhost:5000/api/categories/:categoryId/subcategories/:subcategoryId/sub-subcategories/:subSubcategoryId/products
### Note 
Error Responses:
400 Bad Request: { "message": "Sub-subcategory name is required" }
401 Unauthorized: { "message": "Invalid or missing API key" }
404 Not Found: { "message": "Category not found" } or { "message": "Subcategory not found" }
500 Internal Server Error: { "message": "Server error" }