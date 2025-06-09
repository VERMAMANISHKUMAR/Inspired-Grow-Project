import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {/* Grocery */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://rukminim2.flixcart.com/flap/77/77/image/29327f40e9c4d26b.png?q=100"
            alt="Grocery"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Grocery</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-full md:w-[600px] z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              {/* Fruits & Vegetables */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Fruits & Vegetables</h3>
                <Link to="/fruits" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Fresh Fruits</Link>
                <Link to="/vegetables" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Fresh Vegetables</Link>
                <Link to="/exotic" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Exotic Fruits & Veggies</Link>
                <Link to="/organic" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Organic Produce</Link>
              </div>
              {/* Dairy & Bakery */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Dairy & Bakery</h3>
                <Link to="/dairy" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Milk & Dairy Products</Link>
                <Link to="/cheese" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Cheese</Link>
                <Link to="/yogurt" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Yogurt & Curd</Link>
                <Link to="/bakery" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Bread & Bakery</Link>
                <Link to="/butter" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Butter & Margarine</Link>
              </div>
              {/* Pantry Staples */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Pantry Staples</h3>
                <Link to="/grains" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Rice & Grains</Link>
                <Link to="/pulses" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Pulses & Lentils</Link>
                <Link to="/spices" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Spices & Seasonings</Link>
                <Link to="/oils" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Cooking Oils</Link>
                <Link to="/flours" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Flours & Atta</Link>
              </div>
              {/* Snacks & Beverages */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Snacks & Beverages</h3>
                <Link to="/snacks" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Chips & Snacks</Link>
                <Link to="/biscuits" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Biscuits & Cookies</Link>
                <Link to="/beverages" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Soft Drinks & Juices</Link>
                <Link to="/tea" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Tea & Coffee</Link>
              </div>
              {/* Household & Personal Care */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Household & Personal Care</h3>
                <Link to="/detergents" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Detergents & Cleaners</Link>
                <Link to="/toiletries" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Toiletries</Link>
                <Link to="/hygiene" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Personal Hygiene</Link>
              </div>
              {/* Other */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Other</h3>
                <Link to="/frozen" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Frozen Foods</Link>
                <Link to="/canned" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Canned Goods</Link>
                <Link to="/sweets" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Sweets & Desserts</Link>
                <Link to="/pet" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Pet Supplies</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobiles */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUP_eR9WBnfFgnHxC7xLvQ7XvQ9cBcmkwCRg&s"
            alt="Mobiles"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Mobiles</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 max-h-96 overflow-y-auto z-10">
            <Link to="/smartphones/samsung" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Samsung</Link>
            <Link to="/smartphones/apple" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Apple</Link>
            <Link to="/smartphones/oppo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">OPPO</Link>
            <Link to="/smartphones/vivo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vivo</Link>
            <Link to="/smartphones/oneplus" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">OnePlus</Link>
            <Link to="/smartphones/motorola" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Motorola</Link>
            <Link to="/smartphones/realme" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Realme</Link>
            <Link to="/smartphones/xiaomi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Xiaomi</Link>
            <Link to="/smartphones/nokia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nokia</Link>
            <Link to="/smartphones/sony" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">SONY</Link>
            <Link to="/smartphones/lenovo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lenovo</Link>
            <Link to="/smartphones/honor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Honor</Link>
            <Link to="/smartphones/asus" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Asus</Link>
            <Link to="/smartphones/iqoo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">iQOO</Link>
            <Link to="/smartphones/lava" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">LAVA</Link>
            <Link to="/smartphones/infinix" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Infinix</Link>
          </div>
        </div>

        {/* Fashion */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://media.istockphoto.com/id/1367180724/photo/stylish-young-women-in-pastel-outfits-standing-together-fashion-concept-stock-photo.jpg?s=612x612&w=0&k=20&c=o-uxyttHDkuR9nLopGp2rdGirgCRtRLHTY-4sf0AKWM="
            alt="Fashion"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Fashion</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 z-10">
            <Link to="/menswear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's Wear</Link>
            <Link to="/womenswear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women's Wear</Link>
            <Link to="/kidswear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kids' Wear</Link>
            <Link to="/menswear/topwear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's Top Wear</Link>
            <Link to="/menswear/bottomwear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's Bottom Wear</Link>
            <Link to="/womenethnic" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women Ethnic</Link>
            <Link to="/mensfootwear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's Footwear</Link>
            <Link to="/watchesandaccessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Watches and Accessories</Link>
            <Link to="/womenwestern" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women Western</Link>
            <Link to="/essentials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Essentials</Link>
            <Link to="/winter" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Winter</Link>
            <Link to="/kids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kids</Link>
          </div>
        </div>

        {/* Electronics */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
            alt="Electronics"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Electronics</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 z-10">
            <Link to="/laptops" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Laptops</Link>
            <Link to="/cameras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cameras</Link>
            <Link to="/gaming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gaming Consoles</Link>
          </div>
        </div>

        {/* Home & Furniture */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://rukminim2.flixcart.com/flap/77/77/image/ab7e2b022a4587dd.jpg?q=100"
            alt="Home & Furniture"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Home & Furniture</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 z-10">
            <Link to="/livingroom" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Living Room</Link>
            <Link to="/bedroom" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bedroom</Link>
            <Link to="/kitchen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kitchen</Link>
          </div>
        </div>

        {/* Appliances */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/77/77/image/0139228b2f7eb413.jpg?q=100"
            alt="Appliances"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Appliances</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 z-10">
            <Link to="/refrigerators" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Refrigerators</Link>
            <Link to="/washingmachines" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Washing Machines</Link>
            <Link to="/microwaves" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Microwaves</Link>
          </div>
        </div>

        {/* Travel */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://rukminim2.flixcart.com/flap/77/77/image/71050627a56b4693.png?q=100"
            alt="Travel"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Travel</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 z-10">
            <Link to="/flights" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Flights</Link>
            <Link to="/hotels" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hotels</Link>
            <Link to="/buses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Buses</Link>
          </div>
        </div>

        {/* Beauty, Toys & More */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/128/128/image/dff3f7adcf3a90c6.png?q=100"
            alt="Beauty, Toys & More"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Beauty, Toys & More</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 z-10">
            <Link to="/beauty" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Beauty</Link>
            <Link to="/toys" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Toys</Link>
            <Link to="/stationery" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">Stationery</Link>
          </div>
        </div>

        {/* Two Wheelers */}
        <div className="relative group flex flex-col items-center">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/77/77/image/05d708653beff580.png?q=100"
            alt="Two Wheelers"
            className="w-16 h-16 mb-2"
          />
          <button className="text-gray-800 font-medium text-sm hover:text-blue-600 transition">Two Wheelers</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-10 w-48 z-10">
            <Link to="/scooters" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Scooters</Link>
            <Link to="/bikes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bikes</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;