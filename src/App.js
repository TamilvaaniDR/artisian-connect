import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import CraftDetail from "./pages/CraftDetail";
import ArtisanProfile from "./pages/ArtisanProfile";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Context
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navbar"; // ✅ Global navbar for all pages

function App() {
  return (
    <CartProvider>
      <Router>
        {/* ✅ Shared Navbar across all pages */}
        <Navbar />

        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <Routes>
            {/* ✅ Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/craft/:id" element={<CraftDetail />} />
            <Route path="/artisan/:slug" element={<ArtisanProfile />} />

            {/* ✅ Cart & Payment */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />

            {/* ✅ Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;
