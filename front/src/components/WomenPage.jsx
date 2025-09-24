import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProdService from "../Services/Prodservice";

const WomenPage = () => {
  const [products, setProducts] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [search, setSearch] = useState(""); // 🔍 search state

  useEffect(() => {
    ProdService.getProductsByCategory(2)
      .then((res) => {
        console.log("Women Products API Response:", res.data);
        // reverse kar do taki new product pehle aaye
        setProducts((res.data || []).reverse());
        setHasFetched(true);
      })
      .catch((err) => {
        console.error(" Error fetching women products:", err);
        setHasFetched(true);
      });
  }, []);

  // 🔎 Filter products by name
  const filteredProducts = products.filter((p) =>
    (p.Name || p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold" style={{ color: "black" }}>
        Women's Fashion
      </h2>

      {/* 🔍 Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value.replace(/\s+/g, "")) // 🚫 spaces remove
            }
          />
        </div>
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
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
                  <h5 className="card-title">{product.Name || product.name}</h5>
                  <p className="card-text fw-bold text-success">
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
        ) : hasFetched ? (
          <p className="text-center text-muted">
            ⚠️ No products match your search
          </p>
        ) : null}
      </div>

      {/* Footer same as before */}
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
};

export default WomenPage;
