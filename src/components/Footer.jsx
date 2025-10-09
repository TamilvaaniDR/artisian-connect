import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h4 className="text-amber-800 font-bold text-lg">Artisan Connect</h4>
          <p className="text-gray-600 mt-2 text-sm">
            Discover authentic handmade treasures from India’s talented artisans.
          </p>
        </div>
        <div>
          <h5 className="text-gray-800 font-semibold">Explore</h5>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link className="text-gray-600 hover:text-amber-700" to="/explore">Crafts</Link></li>
            <li><Link className="text-gray-600 hover:text-amber-700" to="/sell">Sell Your Craft</Link></li>
            <li><Link className="text-gray-600 hover:text-amber-700" to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-gray-800 font-semibold">Support</h5>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <button type="button" className="text-gray-600 hover:text-amber-700" aria-disabled>
                Help Center (mock)
              </button>
            </li>
            <li>
              <button type="button" className="text-gray-600 hover:text-amber-700" aria-disabled>
                Contact Us (mock)
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} Artisan Connect</span>
          <span>Made with ❤️ for artisans</span>
        </div>
      </div>
    </footer>
  );
}
