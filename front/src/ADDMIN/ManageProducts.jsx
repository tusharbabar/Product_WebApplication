// import React, { useEffect, useState } from "react";
// import Prodservice from "../Services/Prodservice";

// function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({ Name: "", description: "", price: "", image_url: "", category_name: "" });

//   const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     Prodservice.getProducts()
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   // ✅ Delete product
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       Prodservice.deleteProduct(id)
//         .then(() => {
//           alert("Product deleted successfully!");
//           fetchProducts();
//         })
//         .catch((err) => console.error("Error deleting product:", err));
//     }
//   };

//   // ✅ Update product
//   const handleEdit = (product) => {
//     setEditingProduct(product.id);
//     setFormData(product);
//   };

//   const handleUpdate = () => {
//     Prodservice.updateProduct(editingProduct, formData)
//       .then(() => {
//         alert("Product updated successfully!");
//         setEditingProduct(null);
//         fetchProducts();
//       })
//       .catch((err) => console.error("Error updating product:", err));
//   };

//   // ✅ Apply search filter
//   const filteredProducts = products.filter((p) =>
//     p.Name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ Pagination logic (apply on filteredProducts)
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Manage Products</h2>

//       {/* ✅ Search Box */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="🔍 Search by product name..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1); // reset to page 1 when searching
//         }}
//       />

//       <table className="table table-bordered table-striped table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price (₹)</th>
//             <th>Image</th>
//             <th>Category</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((p) => (
//             <tr key={p.id}>
//               <td>{p.id}</td>
//               <td>{p.Name}</td>
//               <td>{p.description}</td>
//               <td>{p.price}</td>
//               <td>
//                 <img
//                   src={p.image_url}
//                   alt={p.Name}
//                   style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                 />
//               </td>
//               <td>{p.category_id}</td>
//               <td>
//                 <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>Edit</button>
//                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//           {currentItems.length === 0 && (
//             <tr>
//               <td colSpan="7" className="text-center text-muted">No products found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* ✅ Pagination controls */}
//       <div className="d-flex justify-content-between">
//         <button
//           className="btn btn-secondary"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Prev
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button
//           className="btn btn-secondary"
//           disabled={currentPage === totalPages || totalPages === 0}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* ✅ Edit Form */}
//       {editingProduct && (
//         <div className="mt-4 p-3 border rounded bg-light">
//           <h4>Edit Product</h4>
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Name"
//             value={formData.Name}
//             onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Description"
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           />
//           <input
//             type="number"
//             className="form-control mb-2"
//             placeholder="Price"
//             value={formData.price}
//             onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Image URL"
//             value={formData.image_url}
//             onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Category"
//             value={formData.category_name}
//             onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
//           />

//           <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
//           <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageProducts;



// import React, { useEffect, useState } from "react";
// import Prodservice from "../Services/Prodservice";

// function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({ 
//     name: "", 
//     description: "", 
//     price: "", 
//     image_url: "", 
//     category_id: "" 
//   });

//   const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     Prodservice.getProducts()
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   // ✅ Delete product
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       Prodservice.deleteProduct(id)
//         .then(() => {
//           alert("✅ Product deleted successfully!");
//           fetchProducts();
//         })
//         .catch((err) => console.error("Error deleting product:", err));
//     }
//   };

//   // ✅ Update product (open form)
//   const handleEdit = (product) => {
//     setEditingProduct(product.id);
//     setFormData({
//       name: product.name || product.Name, // handle both cases
//       description: product.description,
//       price: product.price,
//       image_url: product.image_url,
//       category_id: product.category_id
//     });
//   };

//   const handleUpdate = () => {
//     Prodservice.updateProduct(editingProduct, formData)
//       .then(() => {
//         alert("✅ Product updated successfully!");
//         setEditingProduct(null);
//         fetchProducts();
//       })
//       .catch((err) => console.error("Error updating product:", err));
//   };

//   // ✅ Apply search filter
//   const filteredProducts = products.filter((p) =>
//     (p.name || p.Name).toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Manage Products</h2>

//       {/* ✅ Search Box */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="🔍 Search by product name..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1);
//         }}
//       />

//       <table className="table table-bordered table-striped table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price (₹)</th>
//             <th>Image</th>
//             <th>Category</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((p) => (
//             <tr key={p.id}>
//               <td>{p.id}</td>
//               <td>{p.name || p.Name}</td>
//               <td>{p.description}</td>
//               <td>{p.price}</td>
//               <td>
//                 <img
//                   src={p.image_url}
//                   alt={p.name || p.Name}
//                   style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                 />
//               </td>
//               <td>{p.category_id}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-warning me-2"
//                   onClick={() => handleEdit(p)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => handleDelete(p.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {currentItems.length === 0 && (
//             <tr>
//               <td colSpan="7" className="text-center text-muted">
//                 No products found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* ✅ Pagination controls */}
//       <div className="d-flex justify-content-between">
//         <button
//           className="btn btn-secondary"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Prev
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="btn btn-secondary"
//           disabled={currentPage === totalPages || totalPages === 0}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* ✅ Edit Form */}
//       {editingProduct && (
//         <div className="mt-4 p-3 border rounded bg-light">
//           <h4>Edit Product</h4>
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Description"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//           />
//           <input
//             type="number"
//             className="form-control mb-2"
//             placeholder="Price"
//             value={formData.price}
//             onChange={(e) =>
//               setFormData({ ...formData, price: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Image URL"
//             value={formData.image_url}
//             onChange={(e) =>
//               setFormData({ ...formData, image_url: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Category ID"
//             value={formData.category_id}
//             onChange={(e) =>
//               setFormData({ ...formData, category_id: e.target.value })
//             }
//           />

//           <button className="btn btn-success me-2" onClick={handleUpdate}>
//             Update
//           </button>
//           <button
//             className="btn btn-secondary"
//             onClick={() => setEditingProduct(null)}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageProducts;

import React, { useEffect, useState } from "react";
import Prodservice from "../Services/Prodservice";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category_id: "",
  });

  const [searchTerm, setSearchTerm] = useState(""); //  Search state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    Prodservice.getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  //  Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      Prodservice.deleteProduct(id)
        .then(() => {
          alert("Product deleted successfully!");
          fetchProducts();
        })
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  //  Open edit modal
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name || product.Name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      category_id: product.category_id,
    });

    // Open bootstrap modal programmatically
    const modal = new window.bootstrap.Modal(
      document.getElementById("editModal")
    );
    modal.show();
  };

  const handleUpdate = () => {
    Prodservice.updateProduct(editingProduct, formData)
      .then(() => {
        alert(" Product updated successfully!");
        setEditingProduct(null);
        fetchProducts();

        // Close modal
        const modalEl = document.getElementById("editModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  //  Apply search filter
  const filteredProducts = products.filter((p) =>
    (p.name || p.Name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Manage Products</h2>

      {/*  Search Box */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search by product name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Sr.No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Image</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((p,index) => (
            <tr key={p.id}>
              <td>{index+1}</td>
              <td>{p.id}</td>
              <td>{p.name || p.Name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <img
                   src={
                    p.image_url
                      ? `http://localhost:3000/uploads/${p.image_url}`
                      : "/placeholder.png"
                  }
                  alt={p.name || p.Name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>{p.category_id}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination controls */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* ✅ Bootstrap Modal for Edit Form */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered"> {/* vertically center */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditingProduct(null)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Category ID"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
