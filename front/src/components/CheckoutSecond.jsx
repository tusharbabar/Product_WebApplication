import React from "react";
import { useNavigate } from "react-router-dom";

function CheckoutSecond({ product }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));  // 👈 logged in user

    const orderData = {
      user: user || {},
      cart: [product],  // single product inside array
      address: user?.address || "Default Address", 
      finalAmount: product.price,
    };

    navigate("/checkout", { state: orderData });
  };

  return (
    <div>
      <h3>{product.Name}</h3>
      <p>₹{product.price}</p>
      <button className="btn btn-warning me-2">Add to Cart</button>
      <button className="btn btn-success" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
}

export default CheckoutSecond;
