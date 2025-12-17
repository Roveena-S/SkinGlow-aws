import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Products({ setCart, cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getproduct");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existing = cart.find(p => p._id === item._id);
    if (existing) {
      setCart(cart.map(p => p._id === item._id ? { ...p, qty: p.qty + 1 } : p));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    alert(`${item.name} added to cart!`);
  };

  if (loading) return <div className="p-6 text-center text-2xl text-pink-600">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-8 text-center">
        Welcome to SkinGlow 💖
      </h1>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Skincare & Haircare Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <Link to={`/product/${product._id}`} className="no-underline">
              <div className="p-6">
                <div className="h-48 overflow-hidden rounded-xl mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-pink-600">₹ {product.price}</p>
              </div>
            </Link>
            
            <div className="p-6 pt-0">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}