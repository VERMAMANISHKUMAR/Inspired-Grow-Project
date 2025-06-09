import { useState, useEffect } from 'react';

function ItemOrderPage() {
  // Dummy data for items
  const initialItems = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 49.99,
      image: 'https://via.placeholder.com/50', // Placeholder image
      quantity: 1,
    },
    {
      id: 2,
      name: 'Smartphone Stand',
      price: 12.99,
      image: 'https://via.placeholder.com/50', // Placeholder image
      quantity: 1,
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 39.99,
      image: 'https://via.placeholder.com/50', // Placeholder image
      quantity: 1,
    },
    {
      id: 4,
      name: 'USB-C Cable',
      price: 9.99,
      image: 'https://via.placeholder.com/50', // Placeholder image
      quantity: 1,
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount when items change
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [items]);

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Item Order Page</h1>
      </div>

      {/* Item Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-orange-100 text-gray-800">
              <th className="p-3">Item Image</th>
              <th className="p-3">Item Name</th>
              <th className="p-3">Item Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-gray-50">
                <td className="p-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">${item.price.toFixed(2)}</td>
                <td className="p-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    min="1"
                  />
                </td>
                <td className="p-3">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="mt-6 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        <p className="mt-2 text-lg">
          Total Amount: <span className="font-bold text-purple-600">${totalAmount.toFixed(2)}</span>
        </p>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default ItemOrderPage;