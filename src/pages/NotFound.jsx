import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-extrabold text-amber-800 mb-4">404</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="px-6 py-2 rounded-lg text-white font-semibold bg-amber-600 hover:bg-amber-700">
          Go Home
        </button>
      </Link>
    </div>
  );
}
