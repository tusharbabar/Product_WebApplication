
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "../Services/CartServices";

function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setCart(CartService.getCart());

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleRemove = (id) => {
    CartService.removeFromCart(id);
    setCart(CartService.getCart());
  };

  const getPriceDetails = () => {
    let totalPrice = 0;
    let discount = 0;

    cart.forEach((item) => {
      const price = parseFloat(item.price) || 0;
      totalPrice += price;
      discount += price * 0.1;
    });

    return {
      totalPrice,
      discount,
      finalAmount: totalPrice - discount,
    };
  };

  const { totalPrice, discount, finalAmount } = getPriceDetails();

  if (!user) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center p-4 rounded shadow-sm">
          <h4>⚠️ Please Register/Login First</h4>
          <p>You need an account to view and manage your cart.</p>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setShowOrderForm(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("⚠️ Please enter address!");
      return;
    }

    const orderData = { user, cart, address, finalAmount };

    // Navigate to checkout page
    navigate("/checkout", { state: orderData });
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left: Cart Items */}
        <div className="col-md-6">
          <div className="bg-white rounded shadow-sm p-4">
            <h4 className="mb-4">My Cart ({cart.length})</h4>
            {cart.length === 0 ? (
              <p className="text-center">🛒 Your cart is empty!</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="d-flex align-items-center border-bottom py-3">
                  <img
                    src={
                      item.image_url
                        ? `http://localhost:3000/uploads/${item.image_url}`
                        : "/placeholder.png"
                    }
                    alt={item.Name}
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />

                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-1">{item.Name}</h6>
                    <p className="text-muted small mb-1">{item.description}</p>
                    <h6 className="text-success">₹{item.price}</h6>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6">
          {user && (
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <h5 className="mb-3">👤 Profile</h5>
              <p><strong>Name:</strong> {user.Name}</p>
              <p><strong>Email:</strong> {user.Email}</p>
            </div>
          )}

          <div className="bg-white rounded shadow-sm p-4">
            <h5 className="mb-3">PRICE DETAILS</h5>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Price ({cart.length} items)</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Discount</span>
              <span className="text-success">− ₹{discount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Charges</span>
              <span className="text-success">Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total Amount</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>

            {!showOrderForm && cart.length > 0 && (
              <button
                className="btn btn-warning w-100 fw-bold"
                onClick={handlePlaceOrder}
              >
                PLACE ORDER
              </button>
            )}

            {showOrderForm && (
              <form onSubmit={handleOrderSubmit}>
                <h6>Enter Address :</h6>
                <textarea
                  className="form-control mb-3"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit" className="btn btn-success w-100">
                  Confirm Order
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;



