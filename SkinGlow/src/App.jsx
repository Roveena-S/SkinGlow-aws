import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Login from "./components/Login";
import "./index.css";
import About from "./components/About";
import Checkout from "./components/Checkout";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct";

function App() {
  const navigate = useNavigate();

  // Cart and User state
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Sync user with localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto">
        
        {/* NAVBAR */}
        <header className="flex justify-between items-center p-6 bg-gradient-to-r from-pink-100 to-rose-100 shadow-lg">
          {/* LOGO */}
          <Link to="/" className="no-underline">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
              SkinGlow 
            </h1>
          </Link>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors no-underline">
              Products
            </Link>

            <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors no-underline">
              About
            </Link>

            <Link to="/add-product" className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors no-underline">
              Add Product
            </Link>

            <Link to="/cart" className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors no-underline flex items-center gap-2">
              🛒 Cart ({cart.length})
            </Link>

            {user ? (
              <>
                <span className="text-lg text-gray-700">Hi, {user.username}!</span>
                <button
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors no-underline">
                Login
              </Link>
            )}
          </nav>
        </header>

        {/* ROUTES */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Products cart={cart} setCart={setCart} user={user} />} />
            <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} user={user} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;
