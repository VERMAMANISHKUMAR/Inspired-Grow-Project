// ProductPage.jsx
import React, { useState } from 'react';
import Navbar from "../Navbar"; 
import Sidebar from "../Sidebar"; 

const ProductCard = ({ image, name, price, onAddToCart }) => {
  const discount = 10;
  const discountedPrice = price - (price * discount) / 100;

  const handleAddToCart = () => {
    onAddToCart({ image, name, price: discountedPrice });
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-2 transform hover:scale-105 transition duration-300">
      <div className="relative">
        <img 
          className="w-full h-48 object-cover" // Reduced height to fit more items
          src={image} 
          alt={name}
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {discount}% OFF
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-1 text-gray-800 truncate">{name}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-semibold text-green-600">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 line-through">
            ${price.toFixed(2)}
          </span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg transition duration-300 text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "Organic Apples (1kg)",
      price: 5.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV28JD7TGMapSyHiMK1gFBPoDtiKqcjNXD57uw02VOr7GJu2RUxdxxv9Vsc4APXiJ0mbA&usqp=CAU"
    },
    {
      id: 2,
      name: "Fresh Bananas (1 bunch)",
      price: 2.49,
      image: "https://api.freshtoday.com.bd/media/64f9b5f2d55cb.jpeg"
    },
    {
      id: 3,
      name: "Whole Milk (1L)",
      price: 3.29,
      image: "https://www.jiomart.com/images/product/original/590002686/amul-gold-full-cream-milk-1-l-pouch-product-images-o590002686-p590049228-0-202409131647.jpg?im=Resize=(420,420)"
    },
    {
      id: 4,
      name: "Free Range Eggs (12 pack)",
      price: 4.99,
      image: "https://m.media-amazon.com/images/I/61nt9fmu5bL._SX679_.jpg"
    },
    {
      id: 5,
      name: "Whole Wheat Bread",
      price: 2.99,
      image: "https://eatmiltons.com/cdn/shop/files/Hearty-Whole-Grain_2048-x-2048.png?crop=center&height=1800&v=1722037278&width=1800"
    },
    {
      id: 6,
      name: "Chicken Breast (500g)",
      price: 7.99,
      image: "https://cdn.uengage.io/uploads/6792/image-785516-1647961288.jpeg"
    },
    {
      id: 7,
      name: "Organic Spinach (200g)",
      price: 3.49,
      image: "https://www.greendna.in/cdn/shop/products/English_Spinach__67562_1024x1024@2x.jpg?v=1607938113"
    },
    {
      id: 8,
      name: "Brown Rice (1kg)",
      price: 4.29,
      image: "https://www.jiomart.com/images/product/original/490419418/daawat-brown-basmati-rice-1-kg-product-images-o490419418-p490419418-0-202203150830.jpg?im=Resize=(420,420)"
    },
    {
      id: 9,
      name: "Extra Virgin Olive Oil (500ml)",
      price: 8.99,
      image: "https://cdn.gaiagoodhealth.com/wp-content/uploads/2021/06/05124816/olive-oil-5-ltr-1000x1000-front.jpg"
    },
    {
      id: 10,
      name: "Natural Almonds (250g)",
      price: 6.49,
      image: "https://m.media-amazon.com/images/I/51jAsCv06ML._SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
      id: 11,
      name: "Greek Yogurt (500g)",
      price: 4.79,
      image: "https://www.skotidakis.com/DATA/PRODUIT/29_en~v~plain-0pc.jpg"
    },
    {
      id: 12,
      name: "Fresh Salmon (300g)",
      price: 12.99,
      image: "https://img2.exportersindia.com/product_images/bc-small/2022/7/10201936/-1658295395-6453992.jpeg"
    }
  ];

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout with Sidebar and Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex flex-col`}
        >
          <div className="flex-1 flex flex-col px-4 py-4">
            <h1 className="text-2xl font-bold text-center mb-4">Grocery Products</h1>
            
            {/* Product Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {/* Cart Section */}
            {cart.length > 0 && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-lg flex-shrink-0 max-h-48 overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">Shopping Cart</h2>
                <div className="space-y-2">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 border-b pb-2">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-green-600 text-sm">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm font-semibold">Total Amount:</span>
                  <span className="text-lg font-bold text-green-600">${calculateTotal()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;