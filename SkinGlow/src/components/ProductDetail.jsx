import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProductDetail({ cart, setCart, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getproduct");
      const data = await response.json();
      const foundProduct = data.find(p => p._id === id);
      setProduct(foundProduct);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-2xl text-pink-600 p-10">Loading...</p>;
  if (!product) return <p className="text-center text-2xl text-gray-600 p-10">Product not found</p>;

  const addToCart = () => {
    if (!user) {
      alert("You must login to add to cart!");
      navigate("/login");
      return;
    }

    const existing = cart.find(p => p._id === product._id);
    if (existing) {
      setCart(cart.map(p => p._id === product._id ? { ...p, qty: p.qty + 1 } : p));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("You must login to buy!");
      navigate("/login");
      return;
    }

    const existing = cart.find(p => p._id === product._id);
    let newCart;
    if (existing) {
      newCart = cart.map(p => p._id === product._id ? { ...p, qty: p.qty + 1 } : p);
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
    }
    setCart(newCart);
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <img src={product.image} alt={product.name} className="w-full h-96 object-contain rounded-2xl" />
          </div>
          
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <p className="text-4xl font-bold text-pink-600 mb-6">₹ {product.price}</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={addToCart}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl text-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
              >
                Add to Cart
              </button>

              <button 
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl text-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link to="/" className="text-pink-600 font-semibold hover:text-pink-700 flex items-center gap-2">
                <span>←</span> Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}