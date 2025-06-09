import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const MybookingForm = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    bookNumber: '',
    bookingDate: '',
    customerName: '',
    contactNumber: '',
    location: '',
    remark: ''
  });

  // Generate a unique booking number on component mount
  useEffect(() => {
    const generateBookingNumber = () => {
      const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Random 3-digit number
      return `BN${timestamp}${random}`; // Format: BN + 6-digit timestamp + 3-digit random
    };

    setFormData((prevData) => ({
      ...prevData,
      bookNumber: generateBookingNumber()
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/booking-orders', formData);
      toast.success(`Booking ${response.data.bookNumber} submitted successfully!`, { autoClose: 3000 });
      // Reset form with a new auto-generated booking number
      setFormData({
        bookNumber: '',
        bookingDate: '',
        customerName: '',
        contactNumber: '',
        location: '',
        remark: ''
      });
      // Generate a new booking number immediately after submission
      setFormData((prevData) => ({
        ...prevData,
        bookNumber: generateBookingNumber()
      }));
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Something went wrong. Please try again.', { autoClose: 3000 });
    }
  };

  const generateBookingNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `BN${timestamp}${random}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 pt-16">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex-1 p-4 sm:p-6 bg-gray-100 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
          <form onSubmit={handleSubmit} className="bg-gray-900 text-white shadow-lg rounded p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-orange-400">New Booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="bookNumber"
                placeholder="Book Number"
                value={formData.bookNumber}
                onChange={handleChange}
                readOnly // Make it read-only since it's auto-generated
                required
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 opacity-75 cursor-not-allowed"
              />
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="remark"
                placeholder="Remark"
                value={formData.remark}
                onChange={handleChange}
                required
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded font-semibold transition-colors duration-200 justify-center flex items-center w-full sm:w-auto mx-auto"
            >
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MybookingForm;


