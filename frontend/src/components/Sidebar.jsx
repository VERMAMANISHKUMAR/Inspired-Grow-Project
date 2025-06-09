import { useState, useEffect } from "react";
import {
  FaUsers,
  FaAngleDown,
  FaAngleUp,
  FaTags,
  FaDollarSign,
  FaTachometerAlt,
  FaCartPlus,
  FaCashRegister,
  FaPlusCircle,
  FaShoppingBag,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [dropdowns, setDropdowns] = useState({
    Users_Management: false,
    Order_Management: false,
    Booking_Management: false,
    Product_Management: false,
    Staff_Management: false,
    Category: false,
    Driver_Wallet: false,
    Settings_and_Configuration: false,
    Category_Management: false,
    Coupon_Discount: false,
    App_Loyout_Bonner: false,
    help: false,
  });

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const userRole = (localStorage.getItem("role") || "guest").toLowerCase();
  const isAdmin = userRole === "admin";
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    setPermissions(storedPermissions ? JSON.parse(storedPermissions) : []);
  }, []);

  const hasPermissionFor = (module, action) => {
    if (isAdmin) return true;
    return permissions.includes(action); // Simplified to check if action is in permissions array
  };

  const reportsList = [
    { name: "Wallet", path: "/van-delivery-boy" },
    {name: "Order History", path:'/delivery-boys-history'},
    {name: "Order Details", path:'/order-details'},
   
  ];
  const CategoryList=[
    {name: "Category", path:'/category-page'}, 
    {name: "Show all Items", path:'/all-category-items'},
  ]
  return (
    <div
      className={`bg-gradient-to-b from-red-500 to-red-700 text-white h-screen w-64 fixed top-16 left-0 overflow-y-auto transition-all duration-300 shadow-lg ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="p-4 flex items-center justify-start space-x-3 cursor-pointer hover:bg-red-800 transition-colors duration-200"
        onClick={() => navigate("/dashboard")}
      >
        <FaTachometerAlt className="text-xl" />
        <span className="text-base font-semibold">Dashboard</span>
      </div>

      <ul className="space-y-2 px-2 pb-10">
        {/* Order Management */}
        {(isAdmin || hasPermissionFor("Order_Management", "view")) && (
          <li>
            <div
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-red-800 rounded-lg transition-colors duration-200"
              onClick={() => toggleDropdown("Order_Management")}
            >
              <div className="flex items-center space-x-3">
                <FaCartPlus className="text-lg" />
                <span className="text-sm font-medium">Order Management</span>
              </div>
              {dropdowns.Order_Management ? (
                <FaAngleUp className="text-lg" />
              ) : (
                <FaAngleDown className="text-lg" />
              )}
            </div>
            {dropdowns.Order_Management && (
              <ul className="space-y-1 bg-white text-gray-800 rounded-md p-2 ml-2 shadow-inner">
                {hasPermissionFor("Order_Management", "manage") && (
                  <li
                    className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                    onClick={() => navigate("/reports/customer-orders")}
                  >
                    <FaCashRegister />
                    <span>Order</span>
                  </li>
                )}
              </ul>
            )}
          </li>
        )}

        {/* Booking Management */}
        {(isAdmin || hasPermissionFor("Booking_Management", "view")) && (
          <li>
            <div
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-red-800 rounded-lg transition-colors duration-200"
              onClick={() => toggleDropdown("Booking_Management")}
            >
              <div className="flex items-center space-x-3">
                <FaUsers className="text-lg" />
                <span className="text-sm font-medium">Booking Management</span>
              </div>
              {dropdowns.Booking_Management ? (
                <FaAngleUp className="text-lg" />
              ) : (
                <FaAngleDown className="text-lg" />
              )}
            </div>
            {dropdowns.Booking_Management && (
              <ul className="space-y-1 bg-white text-gray-800 rounded-md p-2 ml-2 shadow-inner">
                {hasPermissionFor("Booking_Management", "manage") && (
                  <li
                    className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                    onClick={() => navigate("/booking")}
                  >
                    <FaShoppingBag />
                    <span>Booking</span>
                  </li>
                )}
                {hasPermissionFor("Booking_Management", "manage") && (
                  <li
                    className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                    onClick={() => navigate("/my-bookings")}
                  >
                    <FaShoppingBag />
                    <span>My Booking</span>
                  </li>
                )}
              </ul>
            )}
          </li>
        )}

        {/* Product Management */}
        {(isAdmin || hasPermissionFor("Product_Management", "view")) && (
          <li>
            <div
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-red-800 rounded-lg transition-colors duration-200"
              onClick={() => toggleDropdown("Product_Management")}
            >
              <div className="flex items-center space-x-3">
                <FaDollarSign className="text-lg" />
                <span className="text-sm font-medium">Delivery Slot Booking</span>
              </div>
              {dropdowns.Product_Management ? (
                <FaAngleUp className="text-lg" />
              ) : (
                <FaAngleDown className="text-lg" />
              )}
            </div>
            {dropdowns.Product_Management && (
              <ul className="space-y-1 bg-white text-gray-800 rounded-md p-2 ml-2 shadow-inner">
                {hasPermissionFor("Product_Management", "manage") && (
                  <li
                    className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                    onClick={() => navigate("/delivery-slot-booking")}
                  >
                    <FaPlusCircle />
                    <span>Slot Booking</span>
                  </li>
                )}
                {hasPermissionFor("Product_Management", "manage") && (
                  <li
                    className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                    onClick={() => navigate("/booking-slot-page")}
                  >
                    <FaPlusCircle />
                    <span>My Booking Slot</span>
                  </li>
                )}
                {hasPermissionFor("Product_Management", "manage") && (
                  <li
                    className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                    onClick={() => navigate("/user-slot-page")}
                  >
                    <FaPlusCircle />
                    <span>User Slot Booking</span>
                  </li>
                )}
              </ul>
            )}
          </li>
        )}

        {/* Staff Management */}
        {(isAdmin || hasPermissionFor("Staff_Management", "view")) && (
          <li>
            <div
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-red-800 rounded-lg transition-colors duration-200"
              onClick={() => toggleDropdown("Staff_Management")}
            >
              <div className="flex items-center space-x-3">
                <FaTags className="text-lg" />
                <span className="text-sm font-medium">Staff Management</span>
              </div>
              {dropdowns.Staff_Management ? (
                <FaAngleUp className="text-lg" />
              ) : (
                <FaAngleDown className="text-lg" />
              )}
            </div>
            {dropdowns.Staff_Management && (
              <ul className="space-y-1 bg-white text-gray-800 rounded-md p-2 ml-2 shadow-inner">
                {hasPermissionFor("Staff_Management", "manage") && (
                  <>
                    <li
                      className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                      onClick={() => navigate("/add-delivery-boy")}
                    >
                      <FaPlusCircle />
                      <span>Add Delivery Boy</span>
                    </li>
                    <li
                      className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                      onClick={() => navigate("/delivery-boy-list")}
                    >
                      <FaPlusCircle />
                      <span>Delivery Boy List</span>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
        )}
     {/* Category*/}
        
          {(isAdmin || hasPermissionFor("Category", "view")) && (
          <li>
            <div
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-red-800 rounded-lg transition-colors duration-200"
              onClick={() => toggleDropdown("Category")}
            >
              <div className="flex items-center space-x-3">
                <FaTachometerAlt className="text-lg" />
                <span className="text-sm font-medium">Category</span>
              </div>
              {dropdowns.Category ? (
                <FaAngleUp className="text-lg" />
              ) : (
                <FaAngleDown className="text-lg" />
              )}
            </div>
            {dropdowns.Category && (
              <ul className="space-y-1 bg-white text-gray-800 rounded-md p-2 ml-2 shadow-inner">
                {hasPermissionFor("ExpenseCategory", "manage") &&
                  CategoryList.map((report) => (
                    <li
                      key={report.name}
                      className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                      onClick={() => navigate(report.path)}
                    >
                      <FaCartPlus />
                      <span>{report.name}</span>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        )}
        {/* Driver Valut */}
        {(isAdmin || hasPermissionFor("Driver_Wallet", "view")) && (
          <li>
            <div
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-red-800 rounded-lg transition-colors duration-200"
              onClick={() => toggleDropdown("Driver_Wallet")}
            >
              <div className="flex items-center space-x-3">
                <FaTachometerAlt className="text-lg" />
                <span className="text-sm font-medium">Driver Wallet</span>
              </div>
              {dropdowns.Driver_Wallet ? (
                <FaAngleUp className="text-lg" />
              ) : (
                <FaAngleDown className="text-lg" />
              )}
            </div>
            {dropdowns.Driver_Wallet && (
              <ul className="space-y-1 bg-white text-gray-800 rounded-md p-2 ml-2 shadow-inner">
                {hasPermissionFor("Driver_Wallet", "manage") &&
                  reportsList.map((report) => (
                    <li
                      key={report.name}
                      className="p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-100 rounded-md text-sm transition-colors duration-200"
                      onClick={() => navigate(report.path)}
                    >
                      <FaCartPlus />
                      <span>{report.name}</span>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;