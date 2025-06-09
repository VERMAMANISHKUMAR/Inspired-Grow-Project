import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const DeliveryBoyList = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/delivery-boys');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setDeliveryBoys(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch delivery boys');
        toast.error(data.message || 'Failed to fetch delivery boys', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error fetching delivery boys:', error);
      setError('Error fetching delivery boys: ' + error.message);
      toast.error('Error fetching delivery boys: ' + error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDeliveryBoy = () => {
    navigate('/add-delivery-boy');
  };

  // Pagination Logic
  const totalPages = Math.ceil(deliveryBoys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDeliveryBoys = deliveryBoys.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout with Sidebar and Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <ToastContainer />
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Delivery Boys List</h1>
            <button
              onClick={handleAddDeliveryBoy}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-sm sm:text-base"
            >
              Add Delivery Boy
            </button>
          </div>

          {/* Loading and Error States */}
          {loading && <p className="text-gray-400 text-center text-sm sm:text-base">Loading...</p>}
          {error && <p className="text-red-400 text-center text-sm sm:text-base">{error}</p>}

          {/* Delivery Boys List */}
          {deliveryBoys.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-700 text-gray-200">
                      <th className="p-3 text-sm">Delivery Boy ID</th>
                      <th className="p-3 text-sm">Delivery Boy Name</th>
                      <th className="p-3 text-sm">Contact Number</th>
                      <th className="p-3 text-sm">Delivery Time</th>
                      <th className="p-3 text-sm">Delivery Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDeliveryBoys.map((boy) => (
                      <tr key={boy.id} className="hover:bg-gray-600 text-center">
                        <td className="p-3 text-sm">{boy.id}</td>
                        <td className="p-3 text-sm">{boy.name}</td>
                        <td className="p-3 text-sm">{boy.contactNumber}</td>
                        <td className="p-3 text-sm">{boy.deliveryTime}</td>
                        <td className="p-3 text-sm">{new Date(boy.deliveryDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-4">
                {currentDeliveryBoys.map((boy) => (
                  <div key={boy.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                    <div className="flex flex-col gap-2">
                      <div>
                        <span className="font-semibold text-sm">ID: </span>
                        <span className="text-sm">{boy.id}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Name: </span>
                        <span className="text-sm">{boy.name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Contact: </span>
                        <span className="text-sm">{boy.contactNumber}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Time: </span>
                        <span className="text-sm">{boy.deliveryTime}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Date: </span>
                        <span className="text-sm">{new Date(boy.deliveryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className={`px-4 py-2 bg-blue-600作成: true,
                      currentPage === 1 || loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-700'
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
                      currentPage === totalPages || loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            !loading && <p className="text-gray-400 text-center text-sm sm:text-base">No delivery boys found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyList;