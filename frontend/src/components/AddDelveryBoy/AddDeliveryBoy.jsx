
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const AddDeliveryBoy = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    contactNumber: '',
    deliveryTime: '',
    deliveryDate: ''
  });

  // Function to generate random ID
  const generateRandomId = () => {
    const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit number
    const newId = `DB${randomNum}`;
    setFormData((prev) => ({ ...prev, id: newId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://inspired-grow-project.onrender.com/api/delivery-boys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setFormData({
          id: '',
          name: '',
          contactNumber: '',
          deliveryTime: '',
          deliveryDate: ''
        });

        toast.success('Delivery boy added successfully!', {
          position: "top-right",
          autoClose: 3000
        });
      } else {
        toast.error(data.message || 'Failed to add delivery boy');
      }
    } catch (error) {
      console.error('Error adding delivery boy:', error);
      toast.error('Failed to add delivery boy: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 pt-16">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`flex-1 py-8 px-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <ToastContainer />
          <h1 className="text-3xl font-bold text-center mb-8">Add Delivery Boy</h1>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md">

            {/* Random ID Generator */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="id">
                Delivery Boy ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg bg-gray-600 text-white focus:outline-none"
                  placeholder="Click to generate ID"
                />
                <button
                  type="button"
                  onClick={generateRandomId}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                Delivery Boy Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                required
              />
            </div>

            {/* Contact */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            {/* Delivery Date */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="deliveryDate">
                Delivery Date
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Delivery Time */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="deliveryTime">
                Delivery Time
              </label>
              <input
                type="time"
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Add Delivery Boy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryBoy;
