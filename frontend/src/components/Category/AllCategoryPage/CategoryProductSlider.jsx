import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FaChevronRight } from 'react-icons/fa';  // Import the arrow icon
import Electronicsitem from './Electronics.item'; // Assuming this component exists

// Slider settings for categories
const categorySettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

// Category data
const categories = [
  { id: 'dairy', name: 'Dairy, Bread & Eggs' },
  { id: 'rolling', name: 'Rolling Paper & Tobacco' },
  { id: 'snacks', name: 'Snacks & Munchies' },
  { id: 'hookah', name: 'Hookah' },
  { id: 'mouth', name: 'Mouth Fresheners' },
  { id: 'drinks', name: 'Cold Drinks & Juices' },
  { id: 'candies', name: 'Candies & Gums' },
];

// Product data for all categories
const productData = {
  dairy: [
    { name: 'Mother Dairy Classic Cup Curd', price: '₹50', weight: '400 g', image: 'https://via.placeholder.com/100x150?text=Curd' },
    { name: 'Mother Dairy Classic Pouch Curd', price: '₹35', weight: '400 g', image: 'https://via.placeholder.com/100x150?text=Pouch+Curd' },
    { name: 'Amul Taaza Homogenised Toned Milk', price: '₹71', weight: '1 ltr', image: 'https://via.placeholder.com/100x150?text=Milk' },
    { name: 'Harvest Gold 100% Atta Whole Wheat Bread', price: '₹60', weight: '400 g', image: 'https://via.placeholder.com/100x150?text=Bread' },
    { name: 'Amul Cow Fresh Milk', price: '₹29', weight: '500 ml', image: 'https://via.placeholder.com/100x150?text=Cow+Milk' },
    { name: 'Mother Dairy Classic Curd', price: '₹55', weight: '400 g', image: 'https://via.placeholder.com/100x150?text=Curd' },
    { name: 'English Maidmaid 1', price: '₹45', weight: '1 kg', image: 'https://via.placeholder.com/100x150?text=Maidmaid' },
  ],
  rolling: [
    { name: 'Rolling Paper Pack', price: '₹100', weight: '50 sheets', image: 'https://via.placeholder.com/100x150?text=Rolling+Paper' },
    { name: 'Tobacco Tin', price: '₹200', weight: '100 g', image: 'https://via.placeholder.com/100x150?text=Tobacco' },
  ],
  snacks: [
    { name: 'Lays Classic Chips', price: '₹20', weight: '52 g', image: 'https://via.placeholder.com/100x150?text=Chips' },
    { name: 'Bingo Mad Angles', price: '₹15', weight: '40 g', image: 'https://via.placeholder.com/100x150?text=Snacks' },
  ],
  hookah: [
    { name: 'Hookah Set', price: '₹500', weight: '2 kg', image: 'https://via.placeholder.com/100x150?text=Hookah' },
    { name: 'Hookah Flavors', price: '₹150', weight: '250 g', image: 'https://via.placeholder.com/100x150?text=Flavors' },
  ],
  mouth: [
    { name: 'Mouth Freshener Mint', price: '₹10', weight: '20 g', image: 'https://via.placeholder.com/100x150?text=Mint' },
    { name: 'Mouth Freshener Elaichi', price: '₹12', weight: '25 g', image: 'https://via.placeholder.com/100x150?text=Elaichi' },
  ],
  drinks: [
    { name: 'Coca-Cola Can', price: '₹40', weight: '300 ml', image: 'https://via.placeholder.com/100x150?text=Coke' },
    { name: 'Real Juice', price: '₹50', weight: '500 ml', image: 'https://via.placeholder.com/100x150?text=Juice' },
  ],
  candies: [
    { name: 'Mentos Roll', price: '₹5', weight: '20 g', image: 'https://via.placeholder.com/100x150?text=Mentos' },
    { name: 'Gum Pack', price: '₹10', weight: '30 g', image: 'https://via.placeholder.com/100x150?text=Gum' },
  ],
};

const CategoryProductSlider = () => {
  const productRefs = {
    dairy: useRef(null),
    rolling: useRef(null),
    snacks: useRef(null),
    hookah: useRef(null),
    mouth: useRef(null),
    drinks: useRef(null),
    candies: useRef(null),
  };

  const handleCategoryClick = (id) => {
    productRefs[id].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Slider */}
      <div className="mb-6">
        <Slider {...categorySettings} className="relative">
          {categories.map((category) => (
            <div key={category.id} className="p-2">
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
              >
                <span>{category.name}</span>
                <FaChevronRight className="text-blue-500" />
              </button>
            </div>
          ))}
        </Slider>
      </div>

      <Electronicsitem/>

      {/* Product Sections */}
      <div>
        {categories.map((category) => (
          <div key={category.id} ref={productRefs[category.id]} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex justify-between items-center">
              <span>{category.name}</span>
              <a href="#" className="text-green-600 text-sm hover:underline">see all</a>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productData[category.id].map((product, index) => (
                <div key={index} className="bg-white border border-blue-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mb-2 rounded-md" />
                  <p className="text-sm text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{product.weight}</p>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-sm font-medium text-gray-900 mb-2">{product.price}</p>
                    <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-all">ADD</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductSlider;
