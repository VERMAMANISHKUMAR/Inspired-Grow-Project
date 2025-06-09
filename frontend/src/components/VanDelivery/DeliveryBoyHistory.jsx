import React, { useState } from 'react';

const deliveryData = [
  {
    id: 'DB101',
    name: 'Rahul Sharma',
    contact: '9876543210',
    paymentMethod: 'Cash + Online',
    cashAmount: 500,
    onlineAmount: 1200,
    cashSubmitted: true,
    submitDate: '2025-04-10',
  },
  {
    id: 'DB102',
    name: 'Priya Verma',
    contact: '9123456780',
    paymentMethod: 'Online Only',
    cashAmount: 0,
    onlineAmount: 950,
    cashSubmitted: null,
    submitDate: null,
  },
  {
    id: 'DB103',
    name: 'Ankit Raj',
    contact: '9988776655',
    paymentMethod: 'Cash Only',
    cashAmount: 800,
    onlineAmount: 0,
    cashSubmitted: false,
    submitDate: null,
  },
  {
    id: 'DB104',
    name: 'Simran Kaur',
    contact: '9012345678',
    paymentMethod: 'Cash + Online',
    cashAmount: 300,
    onlineAmount: 1100,
    cashSubmitted: true,
    submitDate: '2025-04-11',
  },
  {
    id: 'DB105',
    name: 'Rakesh Mehta',
    contact: '9870011223',
    paymentMethod: 'Cash',
    cashAmount: 150,
    onlineAmount: 0,
    cashSubmitted: false,
    submitDate: null,
  },
];

const formatDate = (isoDate) => {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB');
};

const DeliveryBoyHistory = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredData = deliveryData.filter((boy) => {
    if (!selectedDate) return true;
    return boy.submitDate === selectedDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">Delivery Boy Records</h1>
        <div className="flex items-center gap-3">
          <label className="text-lg text-gray-700 font-medium">Filter by Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm">ID</th>
              <th className="px-4 py-3 text-left text-sm">Name</th>
              <th className="px-4 py-3 text-left text-sm">Contact</th>
              <th className="px-4 py-3 text-left text-sm">Payment Method</th>
              <th className="px-4 py-3 text-left text-sm">Cash</th>
              <th className="px-4 py-3 text-left text-sm">Online</th>
              <th className="px-4 py-3 text-left text-sm">Wallet</th>
              <th className="px-4 py-3 text-left text-sm">Submitted</th>
              <th className="px-4 py-3 text-left text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((boy, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-sm">{boy.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{boy.name}</td>
                  <td className="px-4 py-3 text-sm">{boy.contact}</td>
                  <td className="px-4 py-3 text-sm">{boy.paymentMethod}</td>
                  <td className="px-4 py-3 text-sm">₹{boy.cashAmount}</td>
                  <td className="px-4 py-3 text-sm">₹{boy.onlineAmount}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-700">
                    ₹{boy.cashAmount + boy.onlineAmount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {boy.cashSubmitted === true ? (
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Yes
                      </span>
                    ) : boy.cashSubmitted === false ? (
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                        No
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {boy.submitDate ? formatDate(boy.submitDate) : '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No records found for the selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryBoyHistory;
