// src/components/Home.jsx
import React from "react";
import { products } from "../utils/api";
import { Link } from "react-router-dom";

export default function Home({ cart, setCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#d6336c", marginBottom: "15px" }}>Welcome to PlushWorld 💖</h1>

      <h2 style={{ color: "#d6336c" }}>Skincare & Haircare Products</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product._id} style={{ padding: "15px", background: "#fff0f6", borderRadius: "12px" }}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "black" }}>
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "12px" }} />
            </Link>
            <p style={{ marginTop: "10px" }}>{product.description}</p>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
