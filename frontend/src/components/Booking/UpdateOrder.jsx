import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateOrder = () => {
  const [orderData, setOrderData] = useState({
    status: '',
    location: '',
    customerNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { orderId } = useParams(); // Assuming you're using react-router to pass the order ID in params
  
  const API_KEY = 'your-secret-api-key';

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`https://inspired-grow-project.onrender.com/api/orders/${orderId}`, {
          headers: { 'x-api-key': API_KEY },
        });

        if (!response.ok) throw new Error('Failed to fetch order data');

        const data = await response.json();
        setOrderData({
          status: data.status,
          location: data.location,
          customerNumber: data.customerNumber,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://inspired-grow-project.onrender.com/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Failed to update order');

      console.log('Order updated successfully');
      navigate('/orders');  // Redirect to the order listing page or wherever you want after update
    } catch (error) {
      console.error('Error updating order:', error);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-4">Update Order</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <input
            type="text"
            name="status"
            value={orderData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter status (e.g., Pending, Shipped)"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={orderData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter delivery location"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Customer Number</label>
          <input
            type="text"
            name="customerNumber"
            value={orderData.customerNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter customer phone number"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/orders')} // Redirect back to order list
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrder;
