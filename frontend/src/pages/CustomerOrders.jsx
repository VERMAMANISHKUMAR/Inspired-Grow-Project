import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Order() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editValues, setEditValues] = useState({
    orderNumber: '',
    date: '',
    items: '',
    amount: '',
    status: '',
    location: '',
    customerName: '',
    customerNumber: ''
  });
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const API_KEY = 'your-secret-api-key';

  // Load orders from localStorage or API on mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (storedOrders.length > 0) {
      setOrders(storedOrders);
      setFilteredOrders(storedOrders);
    }
    fetchOrders();
  }, []);

  // Update filtered orders based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) =>
        order?.orderNumber?.toString().includes(searchQuery.trim())
      );
      setFilteredOrders(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://inspired-grow-project.onrender.com/api/orders', {
        headers: { 'x-api-key': API_KEY },
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data || []);
      setFilteredOrders(data || []);
      localStorage.setItem('orders', JSON.stringify(data || []));
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders, using local data if available', { autoClose: 3000 });
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(storedOrders);
      setFilteredOrders(storedOrders);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDeliveryPattern = () => {
    navigate('/delivery-boy-list');
  };

  const handleEdit = (order) => {
    setEditingOrderId(order._id);
    setEditValues({
      orderNumber: order.orderNumber || '',
      date: order.date || '',
      items: order.items || '',
      amount: order.amount || '',
      status: order.status || '',
      location: order.location || '',
      customerName: order.customerName || '',
      customerNumber: order.customerNumber || ''
    });
  };

  const handleSave = async (orderId) => {
    if (!orderId) {
      toast.error('Order ID is missing', { autoClose: 3000 });
      return;
    }

    if (!editValues.orderNumber || !editValues.date || !editValues.items || !editValues.amount || !editValues.status || !editValues.location || !editValues.customerName || !editValues.customerNumber) {
      toast.error('Please fill in all editable fields', { autoClose: 3000 });
      return;
    }

    setLoading(true);
    try {
      const orderToUpdate = orders.find(order => order._id === orderId);
      if (!orderToUpdate) {
        throw new Error('Order not found in local state');
      }

      const updatedOrder = {
        orderNumber: editValues.orderNumber,
        date: editValues.date,
        items: editValues.items,
        amount: editValues.amount,
        status: editValues.status,
        location: editValues.location,
        customerName: editValues.customerName,
        customerNumber: editValues.customerNumber
      };

      const response = await fetch(`https://inspired-grow-project.onrender.com/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save order to database');
      }

      const responseData = await response.json();
      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, ...responseData } : order
      );

      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setEditingOrderId(null);
      setEditValues({
        orderNumber: '',
        date: '',
        items: '',
        amount: '',
        status: '',
        location: '',
        customerName: '',
        customerNumber: ''
      });
      toast.success(`Order ${responseData.orderNumber} saved successfully`, { autoClose: 3000 });

      await fetchOrders();
    } catch (error) {
      console.error(`Error saving order ID ${orderId}:`, error);
      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, ...editValues } : order
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setEditingOrderId(null);
      setEditValues({
        orderNumber: '',
        date: '',
        items: '',
        amount: '',
        status: '',
        location: '',
        customerName: '',
        customerNumber: ''
      });
      toast.error(`Failed to save to server: ${error.message}. Saved locally.`, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingOrderId(null);
    setEditValues({
      orderNumber: '',
      date: '',
      items: '',
      amount: '',
      status: '',
      location: '',
      customerName: '',
      customerNumber: ''
    });
  };

  const handleInputChange = (e, field) => {
    setEditValues({
      ...editValues,
      [field]: e.target.value
    });
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderField = (order, field) => {
    if (editingOrderId === order._id && (field === 'orderNumber' || field === 'date' || field === 'items' || field === 'amount' || field === 'location' || field === 'customerName' || field === 'customerNumber')) {
      return (
        <input
          value={editValues[field]}
          onChange={(e) => handleInputChange(e, field)}
          className="w-full border rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type={field === 'date' ? 'date' : 'text'}
          required
        />
      );
    } else if (editingOrderId === order._id && field === 'status') {
      return (
        <select
          value={editValues.status}
          onChange={(e) => handleInputChange(e, 'status')}
          className="w-full border rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Shipped">Shipped</option>
          <option value="Pending">Pending</option>
        </select>
      );
    }
    return field === 'amount' ? `$${order[field]}` : order[field] || '';
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 pt-16">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex-1 p-4 sm:p-6 bg-gray-100 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
            <div className="flex items-center gap-2">
              <button className="text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Admin Management / Orders</h1>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link to="/booking" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add Order
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-gray-600 w-full sm:w-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by Order Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <svg className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {loading && (
            <div className="text-center py-4">
              <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          )}
          {!loading && (
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-orange-100 text-gray-800">
                    <th className="p-3 text-sm">Order Number</th>
                    <th className="p-3 text-sm">Date</th>
                    <th className="p-3 text-sm">Items</th>
                    <th className="p-3 text-sm">Amount</th>
                    <th className="p-3 text-sm">Status</th>
                    <th className="p-3 text-sm">Location</th>
                    <th className="p-3 text-sm">Customer Name</th>
                    <th className="p-3 text-sm">Customer Number</th>
                    <th className="p-3 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order._id} className="border-b bg-white hover:bg-gray-50">
                      <td className="p-3 text-sm">
                        {editingOrderId === order._id ? renderField(order, 'orderNumber') : (
                          <Link to={`/order-details/${order._id}`} className="text-blue-600 no-underline">
                            {order.orderNumber}
                          </Link>
                        )}
                      </td>
                      <td className="p-3 text-sm">{renderField(order, 'date')}</td>
                      <td className="p-3 text-sm">{renderField(order, 'items')}</td>
                      <td className="p-3 text-sm">{renderField(order, 'amount')}</td>
                      <td className="p-3 text-sm">
                        {editingOrderId === order._id ? renderField(order, 'status') : (
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-sm">{renderField(order, 'location')}</td>
                      <td className="p-3 text-sm">{renderField(order, 'customerName')}</td>
                      <td className="p-3 text-sm">{renderField(order, 'customerNumber')}</td>
                      <td className="p-3 flex gap-2">
                        {editingOrderId === order._id ? (
                          <>
                            <button
                              onClick={() => handleSave(order._id)}
                              className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs"
                              disabled={loading}
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-xs"
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleShowDeliveryPattern(order._id)}
                              className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                              disabled={loading}
                            >
                              Delivery
                            </button>
                            <button
                              onClick={() => handleEdit(order)}
                              className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
                              disabled={loading}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && (
            <div className="block sm:hidden space-y-4">
              {currentOrders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded-lg shadow-md border">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="font-semibold text-sm">Order Number: </span>
                      {editingOrderId === order._id ? renderField(order, 'orderNumber') : (
                        <Link to={`/order-details/${order._id}`} className="text-blue-600 no-underline">
                          {order.orderNumber}
                        </Link>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Date: </span>
                      {renderField(order, 'date')}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Items: </span>
                      {renderField(order, 'items')}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Amount: </span>
                      {renderField(order, 'amount')}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Status: </span>
                      {editingOrderId === order._id ? renderField(order, 'status') : (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Location: </span>
                      {renderField(order, 'location')}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Customer Name: </span>
                      {renderField(order, 'customerName')}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Customer Number: </span>
                      {renderField(order, 'customerNumber')}
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {editingOrderId === order._id ? (
                        <>
                          <button
                            onClick={() => handleSave(order._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs"
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-xs"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleShowDeliveryPattern(order._id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                            disabled={loading}
                          >
                            Delivery
                          </button>
                          <button
                            onClick={() => handleEdit(order)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
                            disabled={loading}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && filteredOrders.length > 0 && (
            <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className={`text-gray-600 ${currentPage === 1 || loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    currentPage === index + 1
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-200'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className={`text-gray-600 ${currentPage === totalPages || loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          {!loading && filteredOrders.length === 0 && (
            <div className="text-center mt-6 text-gray-600">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;