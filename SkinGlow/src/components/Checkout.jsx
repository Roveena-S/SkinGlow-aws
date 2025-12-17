import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("");
  const [upi, setUpi] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({
    doorNo: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
    email: ""
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleBuyNow = async () => {
    if (!address.doorNo || !address.city || !address.state || !address.pincode || !address.mobile) {
      alert("Please fill all address fields!");
      return;
    }
    if (!paymentMode) {
      alert("Please select a payment mode!");
      return;
    }
    if (paymentMode === "upi" && !upi) {
      alert("Please enter UPI ID!");
      return;
    }

    const orderData = {
      user: user?.username || "Guest",
      items: cart.map(item => ({
        productName: item.name,
        quantity: item.qty,
        price: item.price
      })),
      totalAmount: total,
      shippingAddress: address,
      paymentMode,
      upiId: paymentMode === "upi" ? upi : ""
    };

    try {
      console.log("Sending order data:", orderData);
      const response = await fetch("http://localhost:5000/api/orders/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        setOrderPlaced(true);
        setCart([]);
      } else {
        alert(result.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error placing order. Please try again.");
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="p-6 text-center">
        <p className="text-2xl text-pink-600 mb-4">Your cart is empty!</p>
        <button 
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="p-8 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-2xl text-center">
          <div className="text-4xl mb-4">✅</div>
          <p className="text-2xl font-bold text-green-800 mb-2">Your order has been placed!</p>
          <p className="text-gray-700 mb-6">Thank you for shopping with SkinGlow. Your products will be delivered soon.</p>
          <button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">Checkout</h2>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
        
        {cart.map(item => (
          <div key={item._id} className="flex items-center gap-4 mb-4 pb-4 border-b">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{item.name}</h4>
              <p className="text-gray-600">Qty: {item.qty} x ₹{item.price}</p>
            </div>
            <p className="font-bold text-pink-600">₹{item.price * item.qty}</p>
          </div>
        ))}
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <h3 className="text-2xl font-bold text-gray-800">Total Amount</h3>
          <p className="text-3xl font-bold text-green-600">₹{total}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Address Details</h3>

        <form className="space-y-4">
          <input type="text" placeholder="Door No" value={address.doorNo} onChange={(e) => setAddress({...address, doorNo: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
          <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
          <input type="text" placeholder="District" value={address.district} onChange={(e) => setAddress({...address, district: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
          <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
          <input type="text" placeholder="Country" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
          <input type="text" placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
          <input type="text" placeholder="Mobile Number" value={address.mobile} onChange={(e) => setAddress({...address, mobile: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
          <input type="email" placeholder="Email" value={address.email} onChange={(e) => setAddress({...address, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Payment Options</h3>

          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select Payment Mode</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI Payment</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          {paymentMode === "upi" && (
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., username@upi)"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          )}

          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl text-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            Buy Now
          </button>
        </form>
      </div>
    </div>
  );
}