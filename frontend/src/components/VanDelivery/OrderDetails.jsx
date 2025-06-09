// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// // Format ISO date to DD/MM/YYYY (if needed later)
// const formatDate = (isoDate) => {
//   if (!isoDate) return '—';
//   const date = new Date(isoDate);
//   return date.toLocaleDateString('en-GB');
// };

// const OrderItems = () => {
//   const { orderNumber } = useParams();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Dummy grocery product items
//     const dummyItems = [
//       {
//         name: 'Basmati Rice 5kg',
//         image: 'https://images.unsplash.com/photo-1600185365483-26f92a1a20ae?auto=format&fit=crop&w=100&q=80',
//         price: 450,
//       },
//       {
//         name: 'Amul Butter 500g',
//         image: 'https://images.unsplash.com/photo-1622887961020-631f9e00c87e?auto=format&fit=crop&w=100&q=80',
//         price: 250,
//       },
//       {
//         name: 'Aashirvaad Atta 10kg',
//         image: 'https://images.unsplash.com/photo-1643922500642-37872354f3cc?auto=format&fit=crop&w=100&q=80',
//         price: 520,
//       },
//       {
//         name: 'Tata Salt 1kg',
//         image: 'https://images.unsplash.com/photo-1590080876774-5c4f8033cfa2?auto=format&fit=crop&w=100&q=80',
//         price: 30,
//       },
//       {
//         name: 'Fortune Sunflower Oil 1L',
//         image: 'https://images.unsplash.com/photo-1615485290352-bd60ec69798d?auto=format&fit=crop&w=100&q=80',
//         price: 140,
//       },
//     ];

//     // Simulate loading delay
//     setTimeout(() => {
//       setItems(dummyItems);
//       setLoading(false);
//     }, 1000);
//   }, [orderNumber]);

//   if (loading) return <p className="text-center text-lg">Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-start">
//         Items for Order {orderNumber}
//       </h1>
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="py-2 px-3 text-left text-sm">Item Image</th>
//               <th className="py-2 px-3 text-left text-sm">Item Name</th>
//               <th className="py-2 px-3 text-left text-sm">Item Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length > 0 ? (
//               items.map((item, idx) => (
//                 <tr key={idx} className="border-b hover:bg-gray-50">
//                   <td className="py-2 px-3">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="py-2 px-3">{item.name}</td>
//                   <td className="py-2 px-3 font-semibold text-green-700">₹{item.price}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center py-4 text-gray-500">
//                   No items found for this order.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderItems;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OrderItems = () => {
  const { orderNumber } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyItems = [
      {
        name: 'Basmati Rice 5kg',
        image: 'https://images.unsplash.com/photo-1600185365483-26f92a1a20ae?auto=format&fit=crop&w=100&q=80',
        price: 450,
      },
      {
        name: 'Amul Butter 500g',
        image: 'https://images.unsplash.com/photo-1622887961020-631f9e00c87e?auto=format&fit=crop&w=100&q=80',
        price: 250,
      },
      {
        name: 'Aashirvaad Atta 10kg',
        image: 'https://images.unsplash.com/photo-1643922500642-37872354f3cc?auto=format&fit=crop&w=100&q=80',
        price: 520,
      },
      {
        name: 'Tata Salt 1kg',
        image: 'https://images.unsplash.com/photo-1590080876774-5c4f8033cfa2?auto=format&fit=crop&w=100&q=80',
        price: 30,
      },
      {
        name: 'Fortune Sunflower Oil 1L',
        image: 'https://images.unsplash.com/photo-1615485290352-bd60ec69798d?auto=format&fit=crop&w=100&q=80',
        price: 140,
      },
    ];

    setTimeout(() => {
      setItems(dummyItems);
      setLoading(false);
    }, 1000);
  }, [orderNumber]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-start">
        Items for Order {orderNumber}
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2 px-3 text-left text-sm">Item Image</th>
              <th className="py-2 px-3 text-left text-sm">Item Name</th>
              <th className="py-2 px-3 text-left text-sm">Item Price</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-3">{item.name}</td>
                  <td className="py-2 px-3 font-semibold text-green-700">₹{item.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No items found for this order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItems;
