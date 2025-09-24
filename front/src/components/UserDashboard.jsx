

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Prodservice from "../Services/Prodservice";
// import "../style/UserDashboard.css"; // CSS

// function UserDashboard() {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({ Name: "", Email: "", password: "" });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");

//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);
//       setFormData({ Name: parsedUser.Name, Email: parsedUser.Email, password: "" });

//       Prodservice.getUserOrders(parsedUser.id)
//         .then((res) => {
//           setOrders(res.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching orders:", err);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("userEmail");
//     navigate("/login");
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedUser = await Prodservice.updateUser(user.id, formData);
//       alert("✅ Profile updated successfully!");

//       const updatedData = { ...user, ...formData };
//       localStorage.setItem("user", JSON.stringify(updatedData));
//       setUser(updatedData);
//       setEditing(false);
//     } catch (err) {
//       console.error("Profile update error:", err);
//       alert("❌ Failed to update profile.");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
//   if (!user)
//     return (
//       <p className="text-center mt-10 text-red-500">
//         No user found. Please login again.
//       </p>
//     );

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">
//         Welcome, <span className="username">{user.Name}</span>
//       </h1>

//       {/* ✅ Profile Card */}
//       <div className="profile-card">
//         {!editing ? (
//           <>
//             <p><strong>Email:</strong> {user.Email}</p>
//             <p><strong>Role:</strong> {user.role}</p>
//             <div className="mt-3">
//               <button className="btn btn-dark me-2" onClick={() => setEditing(true)}>
//                 Edit Profile
//               </button>
//             </div>
//           </>
//         ) : (
//           <form onSubmit={handleUpdateProfile}>
//             <div className="mb-2">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={formData.Name}
//                 onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
//               />
//             </div>
//             <div className="mb-2">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={formData.Email}
//                 onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
//               />
//             </div>
//             <div className="mb-2">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 placeholder="Enter new password"
//               />
//             </div>
//             <div className="d-flex gap-2">
//               <button type="submit" className="btn btn-success w-50">Save</button>
//               <button type="button" className="btn btn-secondary w-50" onClick={() => setEditing(false)}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}
//       </div>

//       <h2 className="orders-title">Your Orders</h2>

//       {orders.length === 0 ? (
//         <p className="no-orders">You have no orders yet.</p>
//       ) : (
//         <div className="orders-table-container">
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>Sr.No</th>
//                 <th>Order ID</th>
//                 <th>Product Name</th>
//                 <th>Image</th>
//                 <th>Price</th>
//                 <th>Address</th>
//                 <th>Payment</th>
//                 <th>Status</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order,index) => (
//                 <tr key={order.order_id} className="text-center border-b hover:bg-gray-50">
//                   <td>{index + 1}</td> {/* Sr. No */}
//                   <td>{order.order_id}</td>
//                   <td>{order.product_name}</td>
//                   <td>
//                     <img
//                       src={
//                     order.image_url
//                       ? `http://localhost:3000/uploads/${order.image_url}`
//                       : "/placeholder.png"
//                   }
//                       alt={order.product_name}
//                       style={{ width: "60px", height: "60px", borderRadius: "8px" ,objectFit:"cover"}}
//                     />
//                   </td>
//                   <td>₹{order.price}</td>
//                   <td>{order.address}</td>
//                   <td>{order.payment_method}</td>
//                   <td>
//                     <span
//                       className={`px-2 py-1 rounded-full text-dark text-sm ${
//                         order.status === "Delivered"
//                           ? "bg-green-600"
//                           : order.status === "Shipped"
//                           ? "bg-blue-500"
//                           : "bg-yellow-500"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td>{new Date(order.created_at).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ✅ Buttons */}
//       <div className="btn-container">
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         <button className="back-btn" onClick={handleBack}>Back</button>
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;


// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaUserCircle,
//   FaEdit,
//   FaSignOutAlt,
//   FaArrowLeft,
//   FaRedo,
// } from "react-icons/fa";
// import Prodservice from "../Services/Prodservice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Bootstrap
// import { Modal, Button, Form } from "react-bootstrap";

// function UserDashboard() {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({ Name: "", Email: "", password: "" });

//   const [q, setQ] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortBy, setSortBy] = useState("newest");
//   const [page, setPage] = useState(1);
//   const PER_PAGE = 8;

//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);
//       setFormData({ Name: parsedUser.Name, Email: parsedUser.Email, password: "" });
//       fetchOrders(parsedUser.id);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const fetchOrders = (userId) => {
//     setLoading(true);
//     Prodservice.getUserOrders(userId)
//       .then((res) => {
//         const data = Array.isArray(res.data) ? res.data : res.data.rows || [];
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//         toast.error("Failed to load orders");
//         setLoading(false);
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("userEmail");
//     toast.success("Logged out");
//     navigate("/login");
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await Prodservice.updateUser(user.id, formData);
//       toast.success("Profile updated successfully!");
//       const updatedData = { ...user, ...formData };
//       localStorage.setItem("user", JSON.stringify(updatedData));
//       setUser(updatedData);
//       setEditing(false);
//     } catch (err) {
//       console.error("Profile update error:", err);
//       toast.error("Failed to update profile.");
//     }
//   };

//   const stats = useMemo(() => {
//     const total = orders.length;
//     const delivered = orders.filter((o) => o.status === "Delivered").length;
//     const shipped = orders.filter((o) => o.status === "Shipped").length;
//     const pending = total - delivered - shipped;
//     const totalSpent = orders.reduce((s, o) => s + (Number(o.price) || 0), 0);
//     return { total, delivered, shipped, pending, totalSpent };
//   }, [orders]);

//   const filteredOrders = useMemo(() => {
//     let list = [...orders];

//     if (q.trim()) {
//       const qq = q.toLowerCase();
//       list = list.filter(
//         (o) =>
//           (o.product_name || "").toLowerCase().includes(qq) ||
//           (o.order_id || "").toLowerCase().includes(qq) ||
//           (o.address || "").toLowerCase().includes(qq)
//       );
//     }

//     if (statusFilter !== "All") {
//       list = list.filter((o) => (o.status || "") === statusFilter);
//     }

//     if (sortBy === "newest") {
//       list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     } else if (sortBy === "oldest") {
//       list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//     } else if (sortBy === "price-asc") {
//       list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
//     } else if (sortBy === "price-desc") {
//       list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
//     }

//     return list;
//   }, [orders, q, statusFilter, sortBy]);

//   const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PER_PAGE));
//   const paginated = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//   if (loading) return <div className="text-center mt-5">Loading dashboard...</div>;
//   if (!user)
//     return (
//       <div className="text-center mt-5">
//         <p>No user found. Please login again.</p>
//         <Button variant="primary" onClick={() => navigate("/login")}>
//           Go to Login
//         </Button>
//       </div>
//     );

//   return (
//     <div className="container mt-3">
//       <ToastContainer />
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>
//           Welcome back, <span className="text-primary">{user.Name}</span>
//         </h2>
//         <div>
//           <Button variant="secondary" className="me-2" onClick={handleBack}>
//             <FaArrowLeft /> Back
//           </Button>
//           <Button variant="danger" onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </Button>
//         </div>
//       </div>
//       {/* Sidebar + Stats */}
//       <div className="row">
//         <div className="col-md-3">
//           <div className="card p-4 mb-3 text-center tushar">
//             <div className="d-flex justify-content-center">
//               {user.image_url ? (
//                 <img
//                   src={`http://localhost:3000/uploads/${user.avatar}`}
//                   alt="avatar"
//                   className="rounded-circle"
//                   width="100"
//                   height="100"
//                 />
//               ) : (
//                 <FaUserCircle size={70} className="text-muted" />
//               )}
//             </div>
//             <h5 className="mt-2">{user.Name}</h5>
//             <p className="text-muted">{user.Email}</p>
//             <p>
//               Role: <strong>{user.role || "User"}</strong>
//             </p>
//             <Button
//               variant="primary"
//               className="me-2"
//               onClick={() => {
//                 setFormData({ Name: user.Name, Email: user.Email, password: "" });
//                 setEditing(true);
//               }}
//             >
//               <FaEdit /> Edit Profile
//             </Button>
//             <br />
//             <Button variant="outline-secondary" onClick={() => fetchOrders(user.id)}>
//               <FaRedo /> Refresh
//             </Button>
//           </div>

//           <div className="card p-3">
//             <h6>Stats</h6>
//             <p>Total Orders: {stats.total}</p>
//             <p>Delivered: {stats.delivered}</p>
//             <p>Shipped: {stats.shipped}</p>
//             <p>Total Spent: ₹{stats.totalSpent}</p>
//           </div>
//         </div>

//         {/* Orders */}
//         <div className="col-md-9">
//           <div className="row">
//             {paginated.length === 0 ? (
//               <p>No orders found.</p>
//             ) : (
//               paginated.map((order, idx) => (
//                 <div className="col-md-6 mb-3" key={idx}>
//                   <div className="card p-2 d-flex flex-row align-items-center">
//                     {/* Left: Image */}
//                     <div style={{ flex: "0 0 100px" }}>
//                       <img
//                         src={
//                           order.image_url
//                             ? `http://localhost:3000/uploads/${order.image_url}`
//                             : "/placeholder.png"
//                         }
//                         alt={order.product_name}
//                         className="img-fluid rounded"
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </div>

//                     {/* Right: Info */}
//                     <div className="ms-3 flex-grow-1">
//                       <h5 className="mb-1">{order.product_name}</h5>
//                       <p className="mb-1">Order ID: {order.order_id}</p>
//                       <p className="mb-1">Price: ₹{order.price}</p>
//                       <p className="mb-1">Status: {order.status}</p>
//                       <p className="mb-0">
//                         Date: {new Date(order.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Profile Edit Modal */}
//       <Modal show={editing} onHide={() => setEditing(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Profile</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleUpdateProfile}>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={formData.Name}
//                 onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={formData.Email}
//                 onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>New Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="New Password"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setEditing(false)}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit">
//               Save
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default UserDashboard;






import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEdit,
  FaSignOutAlt,
  FaArrowLeft,
  FaRedo,
} from "react-icons/fa";
import Prodservice from "../Services/Prodservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Bootstrap
import { Modal, Button, Form } from "react-bootstrap";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ Name: "", Email: "", password: "" });

  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  // Cancel states
  const [cancelModal, setCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelFeedback, setCancelFeedback] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData({ Name: parsedUser.Name, Email: parsedUser.Email, password: "" });
      fetchOrders(parsedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = (userId) => {
    setLoading(true);
    Prodservice.getUserOrders(userId)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.rows || [];
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    toast.success("Logged out");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await Prodservice.updateUser(user.id, formData);
      toast.success("Profile updated successfully!");
      const updatedData = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedData));
      setUser(updatedData);
      setEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  const stats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter((o) => o.status === "Delivered").length;
    const shipped = orders.filter((o) => o.status === "Shipped").length;
    const pending = total - delivered - shipped;
    const totalSpent = orders.reduce((s, o) => s + (Number(o.price) || 0), 0);
    return { total, delivered, shipped, pending, totalSpent };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let list = [...orders];

    if (q.trim()) {
      const qq = q.toLowerCase();
      list = list.filter(
        (o) =>
          (o.product_name || "").toLowerCase().includes(qq) ||
          (o.order_id || "").toLowerCase().includes(qq) ||
          (o.address || "").toLowerCase().includes(qq)
      );
    }

    if (statusFilter !== "All") {
      list = list.filter((o) => (o.status || "") === statusFilter);
    }

    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    return list;
  }, [orders, q, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PER_PAGE));
  const paginated = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (loading) return <div className="text-center mt-5">Loading dashboard...</div>;
  if (!user)
    return (
      <div className="text-center mt-5">
        <p>No user found. Please login again.</p>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </div>
    );

  return (
    <div className="container mt-3">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          Welcome back, <span className="text-primary">{user.Name}</span>
        </h2>
        <div>
          <Button variant="secondary" className="me-2 d-inline mb-1" onClick={handleBack}>
            <FaArrowLeft /> Back
          </Button>
          <Button variant="danger" className="mb-1" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </Button>
        </div>
      </div>

      {/* Sidebar + Stats */}
      <div className="row">
        <div className="col-md-3">
          <div className="card p-4 mb-3 text-center tushar">
            <div className="d-flex justify-content-center">
              {user.image_url ? (
                <img
                  src={`http://localhost:3000/uploads/${user.avatar}`}
                  alt="avatar"
                  className="rounded-circle"
                  width="100"
                  height="100"
                />
              ) : (
                <FaUserCircle size={70} className="text-muted" />
              )}
            </div>
            <h5 className="mt-2">{user.Name}</h5>
            <p className="text-muted">{user.Email}</p>
            <p>
              Role: <strong>{user.role || "User"}</strong>
            </p>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => {
                setFormData({ Name: user.Name, Email: user.Email, password: "" });
                setEditing(true);
              }}
            >
              <FaEdit /> Edit Profile
            </Button>
            <br />
            <Button variant="outline-secondary" onClick={() => fetchOrders(user.id)}>
              <FaRedo /> Refresh
            </Button>
          </div>

          <div className="card p-3">
            <h6>Stats</h6>
            <p>Total Orders: {stats.total}</p>
            <p>Delivered: {stats.delivered}</p>
            <p>Shipped: {stats.shipped}</p>
            <p>Total Spent: ₹{stats.totalSpent}</p>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-9">
          <div className="row">
            {paginated.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              paginated.map((order, idx) => (
                <div className="col-md-6 mb-3" key={idx}>
                  <div className="card p-2 d-flex flex-row align-items-center">
                    {/* Left: Image */}
                    <div style={{ flex: "0 0 100px" }}>
                      <img
                        src={
                          order.image_url
                            ? `http://localhost:3000/uploads/${order.image_url}`
                            : "/placeholder.png"
                        }
                        alt={order.product_name}
                        className="img-fluid rounded"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Right: Info */}
                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1">{order.product_name}</h5>
                      <p className="mb-1">Order ID: {order.order_id}</p>
                      <p className="mb-1">Price: ₹{order.price}</p>
                       <p className="mb-1">Address: {order.address}</p>
                       <p className="mb-1">Contact: {order.contact}</p>
                      <p className="mb-1">Status: {order.status}</p>
                      
                      <p className="mb-0">
                        Date: {new Date(order.created_at).toLocaleDateString()}
                      </p>

                      {/* Cancel button */}
                      {order.status !== "Cancelled" && order.status !== "Delivered" && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setSelectedOrder(order);
                            setCancelFeedback("");
                            setCancelModal(true);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <Modal show={editing} onHide={() => setEditing(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateProfile}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.Email}
                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Cancel Order Modal */}
      <Modal show={cancelModal} onHide={() => setCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                Are you sure you want to cancel order{" "}
                <strong>{selectedOrder.product_name}</strong> (ID:{" "}
                {selectedOrder.order_id})?
              </p>
              <Form.Group>
                <Form.Label>Reason / Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={cancelFeedback}
                  onChange={(e) => setCancelFeedback(e.target.value)}
                  placeholder="Enter reason for cancellation..."
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCancelModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              toast.success("Order cancelled successfully!");
              console.log("Cancelled:", selectedOrder, "Feedback:", cancelFeedback);

              // Update UI after cancel
              setOrders((prev) =>
                prev.map((o) =>
                  o.order_id === selectedOrder.order_id
                    ? { ...o, status: "Cancelled", feedback: cancelFeedback }
                    : o
                )
              );

              setCancelModal(false);
            }}
          >
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserDashboard;
