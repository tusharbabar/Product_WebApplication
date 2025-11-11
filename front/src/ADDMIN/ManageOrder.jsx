

// import React, { useEffect, useState } from "react";
// import Prodservice from "../Services/Prodservice";

// function ManageOrders() {
//   const [orders, setOrders] = useState([]);
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [formData, setFormData] = useState({ status: "", payment_method: "", address: "" });
//   const [showModal, setShowModal] = useState(false);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 5;

//   // Load orders
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = () => {
//     Prodservice.getAllOrders().then((res) => {
//       setOrders(res.data);
//     });
//   };

//   // Delete order
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       Prodservice.deleteOrder(id).then(() => {
//         fetchOrders();
//       });
//     }
//   };

//   // Start editing (open modal)
//   const handleEdit = (order) => {
//     setEditingOrder(order.order_id);
//     setFormData({
//       status: order.status,
//       payment_method: order.payment_method,
//       address: order.address
//     });
//     setShowModal(true);
//   };

//   // Update order
//   const handleUpdate = () => {
//     Prodservice.updateOrder(editingOrder, formData).then(() => {
//       setEditingOrder(null);
//       setShowModal(false);
//       fetchOrders();
//     });
//   };

//   // Pagination logic
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

//   const totalPages = Math.ceil(orders.length / ordersPerPage);

//   return (
//     <div className="container mt-4">
//       <h2>Manage Orders</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Sr.No</th>
//             <th>ID</th>
//             <th>User</th>
//             <th>Product</th>
//             <th>Price</th>
//             <th>Address</th>
//             <th>Status</th>
//             <th>Payment</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentOrders.map((order,index) => (
//             <tr key={order.order_id}>
//               <td>{indexOfFirstOrder + index + 1}</td>
//               <td>{order.order_id}</td>
//               <td>{order.user_name}</td>
//               <td>{order.product_name}</td>
//               <td>{order.product_price}</td>
//               <td>{order.address}</td>
//               <td>{order.status}</td>
//               <td>{order.payment_method}</td>
//               <td>
//                 <button
//                   className="btn btn-warning btn-sm me-3"
//                   onClick={() => handleEdit(order)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(order.order_id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <nav>
//         <ul className="pagination">
//           {[...Array(totalPages)].map((_, index) => (
//             <li
//               key={index}
//               className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
//             >
//               <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Bootstrap Modal */}
//       {showModal && (
//         <div
//           className="modal show d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Order #{editingOrder}</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {/* Status input */}
//                 <div className="mb-3">
//                   <label className="form-label">Status</label>
//                   <select
//                     className="form-control"
//                     value={formData.status}
//                     onChange={(e) =>
//                       setFormData({ ...formData, status: e.target.value })
//                     }
//                   >
//                     <option value="">-- Select Status --</option>
//                     <option value="Pending">Pending</option>
//                     <option value="Confirmed">Confirmed</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>


//                 {/* Payment method dropdown */}
//                 <div className="mb-3">
//                   <label className="form-label">Payment Method</label>
//                   <select
//                     className="form-select"
//                     value={formData.payment_method}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         payment_method: e.target.value,
//                       })
//                     }
//                   >
//                     <option value="">Select Method</option>
//                     <option value="Cash">Cash</option>
//                     <option value="UPI">UPI</option>
//                     <option value="Card">Card</option>
//                     <option value="Net Banking">Net Banking</option>
//                   </select>
//                 </div>

//                 {/* Address input */}
//                 <div className="mb-3">
//                   <label className="form-label">Address</label>
//                   <textarea
//                     className="form-control"
//                     rows="2"
//                     value={formData.address}
//                     onChange={(e) =>
//                       setFormData({ ...formData, address: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button className="btn btn-success" onClick={handleUpdate}>
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageOrders;


import React, { useEffect, useState } from "react";
import Prodservice from "../Services/Prodservice";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    payment_method: "",
    address: ""
  });
  const [showModal, setShowModal] = useState(false);

  // Search filter
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Load orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    Prodservice.getAllOrders().then((res) => {
      setOrders(res.data);
    });
  };

  // Delete order
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      Prodservice.deleteOrder(id).then(() => {
        fetchOrders();
      });
    }
  };

  // Start editing (open modal)
  const handleEdit = (order) => {
    setEditingOrder(order.order_id);
    setFormData({
      status: order.status,
      payment_method: order.payment_method,
      address: order.address
    });
    setShowModal(true);
  };

  // Update order
  const handleUpdate = () => {
    Prodservice.updateOrder(editingOrder, formData).then(() => {
      setEditingOrder(null);
      setShowModal(false);
      fetchOrders();
    });
  };

  // 🔎 Filter orders by user_name (case-insensitive)
  const filteredOrders = orders.filter((order) =>
    order.user_name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>

      {/* 🔎 Search Input */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by user name"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Price</th>
            <th>Address</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={order.order_id}>
              <td>{indexOfFirstOrder + index + 1}</td>
              <td>{order.order_id}</td>
              <td>{order.user_name}</td>
              <td>{order.product_name}</td>
              <td>{order.product_price}</td>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>{order.Contact}</td>
              <td>{order.payment_method}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-3"
                  onClick={() => handleEdit(order)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(order.order_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Order #{editingOrder}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Status input */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="">-- Select Status --</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Payment method dropdown */}
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    value={formData.payment_method}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payment_method: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Method</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                </div>

                {/* Address input */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrders;




