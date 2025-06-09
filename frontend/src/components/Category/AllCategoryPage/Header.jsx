import React from 'react';
import { FaSearch, FaEllipsisV, FaUser, FaShoppingCart, FaBell, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import img from '../../../assets/Logo.png'
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Perform search logic here (optional)
  };

  return (
    <div className="relative w-full sm:w-64">
      <input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

const Header = () => {
  const [showLogin, setShowLogin] = React.useState(false);

  const handleLoginClick = () => setShowLogin(!showLogin);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src={img}
                alt="logo"
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Grocery</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                Categories
                <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48 z-10">
                <a href="/category/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Electronics
                </a>
                <a href="/category/fashion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Fashion
                </a>
                <a href="/category/home-appliances" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Home Appliances
                </a>
                <div className="border-t border-gray-200"></div>
                <a href="/category/all" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  All Categories
                </a>
              </div>
            </div>
            <SearchBar />
            <button
              onClick={handleLoginClick}
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <FaUser className="mr-1" /> Login
            </button>
            <a href="/cart" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              <FaShoppingCart className="text-xl" />
            </a>
            <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Become a Seller
            </button>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                <FaEllipsisV className="text-xl" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48 right-0 z-10">
                <a href="#action1" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaBell className="mr-2" /> Notifications
                </a>
                <a href="#action2" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaCog className="mr-2" /> Settings
                </a>
                <a href="#action3" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaQuestionCircle className="mr-2" /> Help
                </a>
                <div className="border-t border-gray-200"></div>
                <a href="#action4" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaSignOutAlt className="mr-2" /> Logout
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md"
            >
              <FaEllipsisV className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showLogin && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="/products" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                Products
              </a>
              <div className="relative">
                <button className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                  Categories
                </button>
                <div className="pl-4">
                  <a href="/category/electronics" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Electronics
                  </a>
                  <a href="/category/fashion" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Fashion
                  </a>
                  <a href="/category/home-appliances" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Home Appliances
                  </a>
                  <a href="/category/all" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    All Categories
                  </a>
                </div>
              </div>
              <div className="px-3 py-2">
                <SearchBar />
              </div>
              <a
                href="/cart"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                <FaShoppingCart className="inline mr-2" /> Cart
              </a>
              <button className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                Become a Seller
              </button>
              <a href="#action1" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                <FaBell className="inline mr-2" /> Notifications
              </a>
              <a href="#action2" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                <FaCog className="inline mr-2" /> Settings
              </a>
              <a href="#action3" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                <FaQuestionCircle className="inline mr-2" /> Help
              </a>
              <a href="#action4" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                <FaSignOutAlt className="inline mr-2" /> Logout
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Login Form */}
      {showLogin && (
        <div className="absolute top-16 right-4 bg-white p-6 border border-gray-200 shadow-lg rounded-md z-50 md:w-96">
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleLoginClick}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Header;