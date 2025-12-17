import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart, user }) {
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(cart.map(i => i._id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(i => i._id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0));
  };

  const removeItem = (id) => setCart(cart.filter(i => i._id !== id));

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!user) {
      alert("You must login to checkout!");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart 🛒</h2>

      {cart.length === 0 && (
        <div className="text-center py-10">
          <p className="text-2xl text-pink-600 mb-4">
            Feeling empty? Pamper yourself with the care you deserve 💖
          </p>
          <button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {cart.map(item => (
        <div key={item._id} className="bg-white rounded-xl shadow-md p-6 mb-4 flex flex-col md:flex-row items-center gap-6">
          <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-lg" />
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-2xl font-bold text-pink-600">₹ {item.price}</p>
            
            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => decreaseQty(item._id)}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-bold">{item.qty}</span>
              <button 
                onClick={() => increaseQty(item._id)}
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl hover:bg-gray-300"
              >
                +
              </button>
              
              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Total Amount</h2>
            <p className="text-3xl font-bold text-green-600">₹ {total}</p>
          </div>
          
          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl text-xl font-bold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      )}


    </div>
  );
}