import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-amber-700 text-white"
      : "bg-white text-amber-700 border border-amber-600 hover:bg-amber-50";

  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-amber-700 tracking-tight">
        Artisan Connect
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-3">
        <Link to="/">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${isActive("/")}`}
          >
            Home
          </button>
        </Link>

        <Link to="/explore">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${isActive("/explore")}`}
          >
            Explore
          </button>
        </Link>

        <Link to="/product/1">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${isActive("/product/1")}`}
          >
            Product Details
          </button>
        </Link>

        <Link to="/login">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${isActive("/login")}`}
          >
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${isActive("/signup")}`}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
