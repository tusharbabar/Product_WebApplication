import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProdService from "../Services/Prodservice";
import "../style/GroceryPage.css";

function GroceryPage() {
  const [groceries, setGroceries] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [search, setSearch] = useState("");

  //  Fetch groceries (category 5) & vegetables (category 6)
  useEffect(() => {
    ProdService.getProductsByCategory(5)
      .then((res) => setGroceries(res.data))
      .catch((err) => console.error("Error fetching groceries:", err));

    ProdService.getProductsByCategory(6)
      .then((res) => setVegetables(res.data))
      .catch((err) => console.error("Error fetching vegetables:", err));
  }, []);

  // 🔎 Filter groceries by Name or Price
  const filteredGroceries = groceries.filter((product) => {
    const searchTerm = search.toLowerCase();
    return (
      (product.Name && product.Name.toLowerCase().includes(searchTerm)) ||
      (product.price && String(product.price).includes(searchTerm))
    );
  });

  return (
    <div className="container py-3">
      <h2 className="text-center mb-4">Grocery Products</h2>

      {/* 🔍 Search Box */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search grocery by name or price..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))
            // ✅ only a-z, A-Z, 0-9, _, -
          }
          className="form-control w-50 shadow-sm"
        />
      </div>

      {/* 🛒 Grocery Section */}
      <div className="row">
        {filteredGroceries.length === 0 ? (
          <h4 className="text-center text-muted">No groceries found</h4>
        ) : (
          filteredGroceries.map((product, index) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm position-relative">
                {/* 🆕 Show "New" badge on latest product */}
                {index === 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    New
                  </span>
                )}

                <img
                  src={
                    product.image_url
                      ? `http://localhost:3000/uploads/${product.image_url}`
                      : "/placeholder.png"
                  }
                  alt={product.Name}
                  className="card-img-top"
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.Name}</h5>
                  <p className="card-text text-success fw-bold">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🥦 Vegetables Section */}
      <h2 className="text-center my-4">Vegetables</h2>
      <div className="row">
        {vegetables.length === 0 ? (
          <h4 className="text-center text-muted">No vegetables found</h4>
        ) : (
          vegetables.map((product, index) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm position-relative">
                {index === 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    New
                  </span>
                )}

                <img
                  src={
                    product.image_url
                      ? `http://localhost:3000/uploads/${product.image_url}`
                      : "/placeholder.png"
                  }
                  alt={product.Name}
                  className="card-img-top"
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.Name}</h5>
                  <p className="card-text text-success fw-bold">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    className="btn btn-success mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              Your one-stop shop for all your product needs. Quality products at
              affordable prices.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/men">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Shipping Policy</Link></li>
              <li><Link to="/">Return Policy</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: babartushar560@gmail.com</p>
            <p>Phone: +91 9529647719</p>
            <div className="social-icons">
              <Link to="https://github.com/tusharbabar"><i className="fab fa-github"></i></Link>
              <Link to="https://www.linkedin.com/in/tushar-babar-69643a292/"><i className="fab fa-linkedin"></i></Link>
              <Link to="#"><i className="fab fa-twitter"></i></Link>
              <Link to="#"><i className="fab fa-instagram"></i></Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Product Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default GroceryPage;




