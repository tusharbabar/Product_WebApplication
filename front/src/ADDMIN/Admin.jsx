


    

//  import React from "react";
//  function Admin() {
//    return (
//      <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1 style={{ color: "#333" }}>⚡ Admin Dashboard</h1>
//       <p>Welcome to the admin panel. From here, you can manage users, products, and view reports.</p>
//      </div>
//    );
//  }

//  export default Admin;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminServices from "../Services/AdminServices";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Admin() {
//   const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0 });
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ✅ Fetch dashboard stats
//     AdminServices.getStats()
//       .then((res) => setStats(res.data))
//       .catch((err) => console.error("Stats Error:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center mb-4">⚡ Admin Dashboard</h1>

//       {/* Dashboard Stats */}
//       <div className="row mb-5">
//         <div className="col-md-6">
//           <div className="card text-center shadow p-4">
//             <h4>Total Users</h4>
//             <p className="fs-3 fw-bold text-primary">{stats.totalUsers}</p>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="card text-center shadow p-4">
//             <h4>Total Products</h4>
//             <p className="fs-3 fw-bold text-success">{stats.totalProducts}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admin;

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Admin() {
  const [stats, setStats] = useState({
    users: 30,
    products: 50,
    orders: 20,
  });

  // If you want to fetch real data from backend, replace this with API call
  useEffect(() => {
    // Example:
    // fetch("http://localhost:3000/admin/stats")
    //   .then((res) => res.json())
    //   .then((data) => setStats(data));
  }, []);

  const data = [
    { name: "Users", value: stats.users },
    { name: "Products", value: stats.products },
    { name: "Orders", value: stats.orders },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#333" }}>⚡ Admin Dashboard</h1>
      <p>
        Welcome to the admin panel. From here, you can manage users, products,
        and view reports.
      </p>

      {/* Pie Chart Section */}
      <div style={{ marginTop: "40px", width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Admin;
