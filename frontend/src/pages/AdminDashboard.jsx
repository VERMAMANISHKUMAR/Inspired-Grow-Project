// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// function AdminDashboard(){
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col h-screen overflow-hidden">
//       {/* Navbar - Fixed at Top */}
//       <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Main Layout with Sidebar and Content */}
//       <div className="flex flex-1 pt-16">
//         {/* Sidebar */}
//         <Sidebar isSidebarOpen={isSidebarOpen} />

//         {/* Main Content */}
//         <div
//           className={`flex-1 p-4 md:p-6 bg-gray-100 transition-all duration-300 ${
//             isSidebarOpen ? 'ml-64' : 'ml-0'
//           }`}
//         >
//           <h1 className="text-2xl font-bold mb-4 mt-5">Admin Dashboard</h1>

//           {/* Force extra content to enable scrolling */}
//           <div style={{ height: "200vh", background: "#f8f9fa" }}>
//             This content is here to enable scrolling.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, {useState} from "react";
import {
  FaChartLine,
  FaSearch,
  FaFilter,
  FaChartPie,
  FaChartBar
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-200 p-4">
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Quick Stats */}
      <div className="flex flex-1 pt-16">
       {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
<div  className={`flex-1 p-4 md:p-6 bg-gray-100 transition-all duration-300 ${
           isSidebarOpen ? 'ml-64' : 'ml-0'
         }`}>
      <h2 className="text-sm text-gray-400 mt-6 mb-2">QUICK STATS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { label: "Daily Visitors", count: "1250" },
          { label: "Weekly Visitors", count: "8210" },
          { label: "Monthly Visitors", count: "12560" },
          { label: "Yearly Visitors", count: "102250" }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="text-2xl font-bold">{item.count}</h3>
            <span className="text-green-600 inline-flex items-center">
              <FaChartLine className="mr-1" /> {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Location + Data Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Location Progress */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-400 mb-2">LOCATION</h2>
          {[
            { label: "Regional", width: "w-1/4", color: "bg-green-500" },
            { label: "Global", width: "w-3/4", color: "bg-blue-500" },
            { label: "Local", width: "w-1/2", color: "bg-yellow-500" },
            { label: "Internal", width: "w-1/4", color: "bg-red-500" }
          ].map((item, index) => (
            <div key={index} className="mb-4">
              <small className="text-gray-500">{item.label}</small>
              <div className="w-full bg-gray-200 h-1 mt-1">
                <div className={`${item.color} ${item.width} h-1`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-400 mb-2">DATA</h2>
          <div className="flex justify-end space-x-2 mb-2">
            <button className="border border-gray-300 p-1 rounded">
              <FaSearch />
            </button>
            <button className="border border-gray-300 p-1 rounded">
              <FaFilter />
            </button>
          </div>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">Age</th>
                <th className="p-2">Data</th>
                <th className="p-2">Progress</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, age: "20-30", data: "19%", icon: <FaChartPie className="text-green-500" /> },
                { id: 2, age: "20-40", data: "40%", icon: <FaChartBar className="text-blue-500" /> },
                { id: 3, age: "40-50", data: "20%", icon: <FaChartLine className="text-yellow-400" /> },
                { id: 4, age: "50", data: "11%", icon: <FaChartPie className="text-red-500" /> }
              ].map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="p-2">{row.id}</td>
                  <td className="p-2">{row.age}</td>
                  <td className="p-2">{row.data}</td>
                  <td className="p-2">{row.icon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

