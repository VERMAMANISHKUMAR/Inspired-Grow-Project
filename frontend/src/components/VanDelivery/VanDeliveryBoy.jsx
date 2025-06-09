// import React, { useState } from 'react';

// // Sample data
// const deliveryData = [
//   {
//     id: 'DB101',
//     name: 'Rahul Sharma',
//     contact: '9876543210',
//     paymentMethod: 'Cash + Online',
//     cashAmount: 500,
//     onlineAmount: 1200,
//     cashSubmitted: true,
//     submitDate: '2025-04-10',
//   },
//   {
//     id: 'DB102',
//     name: 'Priya Verma',
//     contact: '9123456780',
//     paymentMethod: 'Online Only',
//     cashAmount: 0,
//     onlineAmount: 950,
//     cashSubmitted: null,
//     submitDate: null,
//   },
//   {
//     id: 'DB103',
//     name: 'Ankit Raj',
//     contact: '9988776655',
//     paymentMethod: 'Cash Only',
//     cashAmount: 800,
//     onlineAmount: 0,
//     cashSubmitted: false,
//     submitDate: null,
//   },
//   {
//     id: 'DB104',
//     name: 'Simran Kaur',
//     contact: '9012345678',
//     paymentMethod: 'Cash + Online',
//     cashAmount: 300,
//     onlineAmount: 1100,
//     cashSubmitted: true,
//     submitDate: '2025-04-11',
//   },
//   {
//     id: 'DB105',
//     name: 'Rakesh Mehta',
//     contact: '9870011223',
//     paymentMethod: 'Cash',
//     cashAmount: 150,
//     onlineAmount: 0,
//     cashSubmitted: false,
//     submitDate: null,
//   },
// ];

// // Format ISO date to DD/MM/YYYY
// const formatDate = (isoDate) => {
//   if (!isoDate) return null;
//   const date = new Date(isoDate);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

// // Main component
// const DeliveryBoyTable = () => {
//   const [selectedDate, setSelectedDate] = useState('');

//   // Handle input date change
//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   // Filtered data based on selected date
//   const filteredData = deliveryData.filter((boy) => {
//     if (!selectedDate) return true;
//     return boy.submitDate === selectedDate;
//   });

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//     <div className='flex justify-between'>
//     <h1 className="text-3xl font-bold text-center mb-6">Delivery Boy Records</h1>
    
//       {/* Date Filter Input */}
//       <div className="flex justify-center mb-6">
//         <label className="mr-2 font-medium text-gray-700 mt-1 text-2xl">Filter By Date:</label>
//         <input
//           type="date"
//           className="border px-3 py-2 rounded-md shadow-sm"
//           value={selectedDate}
//           onChange={handleDateChange}
//         />
//       </div>
//     </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="py-3 px-2 text-left">Delivery Boy ID</th>
//               <th className="py-3 px-2 text-left">Delivery Boy Name</th>
//               <th className="py-3 px-2 text-left">Contact Number</th>
//               <th className="py-3 px-2 text-left">Payment Method</th>
//               <th className="py-3 px-2 text-left">Cash Amount</th>
//               <th className="py-3 px-2 text-left">Online Amount</th>
//               <th className="py-3 px-2 text-left">Vault Amount</th>
//               <th className="py-3 px-2 text-left">Cash Submitted</th>
//               <th className="py-3 px-2 text-left">Submit Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((boy, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">{boy.id}</td>
//                   <td className="py-3 px-4">{boy.name}</td>
//                   <td className="py-3 px-4">{boy.contact}</td>
//                   <td className="py-3 px-4">{boy.paymentMethod}</td>
//                   <td className="py-3 px-4">₹{boy.cashAmount}</td>
//                   <td className="py-3 px-4">₹{boy.onlineAmount}</td>
//                   <td className="py-3 px-4 font-semibold text-green-700">
//                     ₹{boy.cashAmount + boy.onlineAmount}
//                   </td>
//                   <td className="py-3 px-4">
//                     {boy.cashSubmitted === true
//                       ? '✅ Yes'
//                       : boy.cashSubmitted === false
//                       ? '❌ No'
//                       : 'N/A'}
//                   </td>
//                   <td className="py-3 px-4">
//                     {boy.submitDate ? formatDate(boy.submitDate) : '—'}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center py-4 text-gray-500">
//                   No records found for selected date.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DeliveryBoyTable;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Format ISO date to DD/MM/YYYY
const formatDate = (isoDate) => {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DeliveryBoyTable = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deliveryRes, orderRes] = await Promise.all([
          fetch('http://localhost:5000/api/delivery-boys'),
          fetch('http://localhost:5000/api/orders'),
        ]);

        const deliveryData = await deliveryRes.json();
        const ordersData = await orderRes.json();

        const deliveryList = Array.isArray(deliveryData)
          ? deliveryData
          : deliveryData?.data && Array.isArray(deliveryData.data)
          ? deliveryData.data
          : [deliveryData].filter(Boolean);

        const orders = Array.isArray(ordersData)
          ? ordersData
          : ordersData?.data && Array.isArray(ordersData.data)
          ? ordersData.data
          : [ordersData].filter(Boolean);

        const deliveryBoyMap = new Map(
          deliveryList.map((boy) => [
            String(boy.id),
            {
              id: boy.id || 'N/A',
              name: boy.name || 'N/A',
              contact: boy.contactNumber || 'N/A',
            },
          ])
        );

        const mergedData = orders.map((order) => {
          const boy = deliveryBoyMap.get(String(order.deliveryBoyId)) || {
            id: order.deliveryBoyId || 'N/A',
            name: 'Unknown',
            contact: 'N/A',
          };
          return {
            id: boy.id,
            name: boy.name,
            contact: boy.contact,
            orderNumber: order.orderNumber || 'N/A',
            date: order.date || null,
            item: order.items || 'N/A',
            amount: order.amount ?? 0,
            status: order.status || 'N/A',
            location: order.location || 'N/A',
            customerName: order.customerName || 'N/A',
            customerNumber: order.customerNumber || 'N/A',
            actionDate: order.actionDate || null,
          };
        });

        setDeliveryBoys(mergedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredData = deliveryBoys.filter((boy) => {
    if (!selectedDate) return true;
    return boy.date?.slice(0, 10) === selectedDate;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Delivery Boy Records</h1>
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700 text-lg">Filter By Date:</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md shadow-sm"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-2 text-left text-sm">Delivery ID</th>
                <th className="py-3 px-2 text-left text-sm">Delivery Name</th>
                <th className="py-3 px-2 text-left text-sm">Contact Number</th>
                <th className="py-3 px-2 text-left text-sm">Order Number</th>
                <th className="py-3 px-2 text-left text-sm">Order Date</th>
                <th className="py-3 px-2 text-left text-sm">Item</th>
                <th className="py-3 px-2 text-left text-sm">Amount</th>
                <th className="py-3 px-2 text-left text-sm">Status</th>
                <th className="py-3 px-2 text-left text-sm">Location</th>
                <th className="py-3 px-2 text-left text-sm">Customer Name</th>
                <th className="py-3 px-2 text-left text-sm">Customer Number</th>
                <th className="py-3 px-2 text-left text-sm">Action Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  <tr key={`${record.id}-${record.orderNumber}-${index}`} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <Link to={`/delivery-boys-history/:id${record.id}`} className="text-blue-600 hover:underline">
                        {record.id}
                      </Link>
                    </td>
                    <td className="py-3 px-2">{record.name}</td>
                    <td className="py-3 px-2">{record.contact}</td>
                    <td className="py-3 px-2">
                      <Link to={`/order-details/${record.orderNumber}`} className="text-blue-600 hover:underline">
                        {record.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-2">{record.date ? formatDate(record.date) : '—'}</td>
                    <td className="py-3 px-2">{record.item}</td>
                    <td className="py-3 px-2">₹{record.amount}</td>
                    <td className="py-3 px-2">{record.status}</td>
                    <td className="py-3 px-2">{record.location}</td>
                    <td className="py-3 px-2">{record.customerName}</td>
                    <td className="py-3 px-2">{record.customerNumber}</td>
                    <td className="py-3 px-2">{record.actionDate ? formatDate(record.actionDate) : '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-gray-500">
                    No records found for selected date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeliveryBoyTable;