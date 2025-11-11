




import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Prodservice from "../Services/Prodservice"; // Axios service
import "bootstrap/dist/css/bootstrap.min.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const phonePeQr = "/PhonePayQR.jpg";

  useEffect(() => {
    const orderData = location.state;
    if (!orderData) return;

    const orderArray = Array.isArray(orderData) ? orderData : [orderData];

    const validOrders = orderArray.map((order) => ({
      ...order,
      cart: order.cart || [],
      user: order.user || {},
      address: order.address || "",
      contact: order.contact || "", // ✅ default empty contact
      finalAmount: order.finalAmount || 0,
    }));

    setOrders(validOrders);
  }, [location.state]);

  const calculateDiscountedAmount = (amount) => {
    return (amount - amount * 0.1).toFixed(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("⚠️ Please select a payment method!");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      alert("⚠️ Please enter your UPI ID!");
      return;
    }

    for (const order of orders) {
      if (!order.address.trim()) {
        alert("⚠️ Please enter delivery address!");
        return;
      }
      if (!order.contact.trim()) {
        alert("⚠️ Please enter contact number!");
        return;
      }
    }

    try {
      setLoading(true);

      // Fire all orders in parallel
      await Promise.all(
        orders.map((order) => {
          const { user, cart, address, contact } = order;

          return Promise.all(
            cart.map((product) =>
              Prodservice.placeOrder({
                user_id: user.id,
                product_id: product.id,
                address,
                contact, // ✅ send contact number to backend
                payment_method: paymentMethod,
                amount: calculateDiscountedAmount(product.price),
              })
            )
          );
        })
      );

      setPaymentSuccess(true);
      setLoading(false);
      setShowModal(true);
    } catch (error) {
      console.error("Payment Error:", error);
      alert("❌ Payment failed. Please try again.");
      setLoading(false);
    }
  };

  const handleQrClick = () => {
    window.open(phonePeQr, "_blank");
  };

  if (orders.length === 0) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center p-4 rounded shadow-sm">
          <h4>⚠️ No order data found!</h4>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-4 fw-bold">Checkout</h3>

      {orders.map((order, idx) => {
        const { user, cart, address, contact, finalAmount } = order;
        const discountedAmount = calculateDiscountedAmount(finalAmount);

        return (
          <div key={idx} className="mb-5">
            <div className="row">
              {/* Left Column */}
              <div className="col-lg-7 mb-4">
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="card-title mb-3">🛒 Cart Items</h5>
                    {cart.length > 0 ? (
                      cart.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center mb-3 border-bottom pb-2"
                        >
                          <img
                            src={
                              item.image_url
                                ? `http://localhost:3000/uploads/${item.image_url}`
                                : "/placeholder.png"
                            }
                            alt={item.Name}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                          <div className="ms-3 flex-grow-1">
                            <h6 className="mb-1">{item.Name}</h6>
                            <p className="mb-1 text-muted">{item.description}</p>
                            <strong>₹{item.price}</strong>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No items in this order.</p>
                    )}
                  </div>
                </div>

                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="card-title mb-3">👤 Delivery Details</h5>
                    <p>
                      <strong>Name:</strong> {user.Name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.Email}
                    </p>

                    <div className="mb-3">
                      <label className="form-label">
                        <strong>Address:</strong>
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={address}
                        onChange={(e) => {
                          const updatedOrders = [...orders];
                          updatedOrders[idx].address = e.target.value;
                          setOrders(updatedOrders);
                        }}
                        placeholder="Enter your delivery address"
                      />
                    </div>

                    {/* ✅ Contact Number */}
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>📞 Contact Number:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={contact}
                        onChange={(e) => {
                          const updatedOrders = [...orders];
                          updatedOrders[idx].contact = e.target.value;
                          setOrders(updatedOrders);
                        }}
                        placeholder="Enter your contact number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-lg-5">
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="card-title mb-3">💰 Price Details</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Items ({cart.length})</span>
                      <span>₹{finalAmount.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Discount (10%)</span>
                      <span className="text-success">
                        − ₹{(finalAmount * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Delivery Charges</span>
                      <span className="text-success">Free</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold mb-3">
                      <span>Total Amount</span>
                      <span>₹{discountedAmount}</span>
                    </div>

                    {!paymentSuccess && (
                      <form onSubmit={handlePaymentSubmit}>
                        <h6 className="mb-2">💳 Payment Method</h6>

                        <div className="mb-2">
                          <input
                            type="radio"
                            id="cod"
                            name="payment"
                            value="COD"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="cod" className="ms-2">
                            Cash on Delivery
                          </label>
                        </div>

                        <div className="mb-2">
                          <input
                            type="radio"
                            id="upi"
                            name="payment"
                            value="UPI"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="upi" className="ms-2">
                            UPI / PhonePe
                          </label>

                          {paymentMethod === "UPI" && (
                            <div className="mt-2">
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Enter UPI ID"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                              />
                              <p className="mb-1">Or scan QR:</p>
                              <img
                                src={PhonePayQR}
                                alt="UPI QR Code"
                                style={{
                                  width: "200px",
                                  cursor: "pointer",
                                  objectFit: "cover",
                                  marginLeft: "10px",
                                }}
                                onClick={handleQrClick}
                              />
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <input
                            type="radio"
                            id="card"
                            name="payment"
                            value="Card"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="card" className="ms-2">
                            Credit/Debit Card
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-success w-100"
                          disabled={loading}
                        >
                          {loading ? "Processing..." : `Pay ₹${discountedAmount}`}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Payment Success Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title"> Payment Successful</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>Your order has been placed successfully!</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/");
                  }}
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

