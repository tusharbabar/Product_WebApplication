import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProdService from "../Services/Prodservice";
import "../style/Menpage.css";

function MenPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    ProdService.getProductsByCategory(1)
      .then((res) => {
        // 🔽 Sort newest products first
        const sortedProducts = [...res.data].sort((a, b) => b.id - a.id);
        setProducts(sortedProducts);
      })
      .catch((err) => {
        console.error("Error fetching men products:", err);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="container py-3">
      <h2 className="text-center mb-4">Men's Products</h2>

      {/* 🔎 Search Box */}
      <div className="row mb-5">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products */}
      <div className="row">
        {filteredProducts.length === 0 ? (
          <h4 className="text-center text-muted">No products found</h4>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
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
                  <h5 className="card-title">
                    {product.Name}
                    {/*  Highlight NEW tag for latest product */}
                    {index === 0 && (
                      <span className="badge bg-danger ms-2">New</span>
                    )}
                  </h5>
                  <p className="card-text text-success">₹{product.price}</p>

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
      {/* Footer same as before */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Your one-stop shop for all your product needs. Quality products at affordable prices.</p>
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
            <p>Email: productinfo560@gmail.com</p>
            <p>Phone: +91 9529647719</p>
            <div className="social-icons">
              <Link to="https://github.com/tusharbabar"><i className="fab fa-github"></i></Link>
              <Link to="https://www.linkedin.com/in/tushar-babar-69643a292/"><i className="fab fa-linkedin"></i></Link>
              <Link to="#"><i className="fab fa-twitter"></i></Link>
              <Link to="#"><i className="fab fa-instagram"></i></Link>
            </div>
          </div>
        </div>

        <br />
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Product Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MenPage;

