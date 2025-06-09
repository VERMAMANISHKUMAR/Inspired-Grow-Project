import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Electronicsitem() {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  const products = [
    { id: 1, name: "Noice SmartWatch", price: "₹ 2932", img: "https://example.com/image1.jpg" },
    { id: 2, name: "Wireless Headphones", price: "₹ 1999", img: "https://example.com/image2.jpg" },
    { id: 3, name: "Bluetooth Speaker", price: "₹ 1599", img: "https://example.com/image3.jpg" },
    { id: 4, name: "Smartphone", price: "₹ 12999", img: "https://example.com/image4.jpg" },
    { id: 5, name: "Gaming Mouse", price: "₹ 899", img: "https://example.com/image5.jpg" },
    { id: 6, name: "Mechanical Keyboard", price: "₹ 2499", img: "https://example.com/image6.jpg" },
    { id: 7, name: "Fitness Band", price: "₹ 1499", img: "https://example.com/image7.jpg" },
    { id: 8, name: "VR Headset", price: "₹ 4999", img: "https://example.com/image8.jpg" },
    { id: 9, name: "Portable Charger", price: "₹ 1299", img: "https://example.com/image9.jpg" },
    { id: 10, name: "Smart Home Hub", price: "₹ 6999", img: "https://example.com/image10.jpg" }
  ];

  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-4">Beauty, Food, Toys & More</h4>
      <div className="w-full">
        <Carousel responsive={responsive} className="">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 text-center">
              <div className="mb-2">
                <a href="https://example.com/product" target="_blank" rel="noopener noreferrer">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-40 object-cover rounded-md"
                  />
                </a>
              </div>
              <p className="text-lg font-medium">{product.name}</p>
              <p className="text-red-500 font-semibold">Price: {product.price}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Electronicsitem;
