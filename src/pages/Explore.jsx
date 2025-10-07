import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ needed for navigation
import crafts from "../data/crafts";

function Explore() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [priceOrder, setPriceOrder] = useState("None");

  const filteredCrafts = crafts
    .filter(
      (craft) =>
        (category === "All" || craft.category === category) &&
        (region === "All" || craft.region === region)
    )
    .sort((a, b) => {
      if (priceOrder === "Low") return a.price - b.price;
      if (priceOrder === "High") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800 px-10 py-10">
      {/* ✅ Navbar is global now */}

      <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">
        Explore Artisans & Crafts
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border border-amber-400 rounded-lg px-4 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Weaving">Weaving</option>
          <option value="Pottery">Pottery</option>
          <option value="Painting">Painting</option>
          <option value="Basketry">Basketry</option>
        </select>

        <select
          onChange={(e) => setRegion(e.target.value)}
          className="border border-amber-400 rounded-lg px-4 py-2"
        >
          <option value="All">All Regions</option>
          <option value="Punjab">Punjab</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Odisha">Odisha</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Kerala">Kerala</option>
        </select>

        <select
          onChange={(e) => setPriceOrder(e.target.value)}
          className="border border-amber-400 rounded-lg px-4 py-2"
        >
          <option value="None">Sort by Price</option>
          <option value="Low">Low to High</option>
          <option value="High">High to Low</option>
        </select>
      </div>

      {/* Crafts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCrafts.map((craft) => (
          <div
            key={craft.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4"
          >
            <img
              src={craft.image}
              alt={craft.name}
              className="rounded-xl h-48 w-full object-cover"
            />
            <h4 className="text-xl font-semibold mt-4 text-amber-700">
              {craft.name}
            </h4>
            <p className="text-gray-600">
              {craft.region} • {craft.category}
            </p>
            <p className="text-gray-800 font-medium mt-1">₹{craft.price}</p>
            <button
              onClick={() => navigate(`/craft/${craft.id}`)} // ✅ works
              className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
