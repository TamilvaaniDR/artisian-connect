import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, CreditCard } from "lucide-react";
import crafts from "../data/crafts";
import { useCart } from "../context/CartContext";

function CraftDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const craft = crafts.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();

  if (!craft) {
    return <h2 className="text-center text-red-600 mt-10">Craft not found!</h2>;
  }

  // Add to Cart via context
  const handleAddToCart = () => {
    addToCart(craft);
    alert(`✅ ${craft.name} added to cart!`);
  };

  // Buy Now
  const handleBuyNow = () => {
    localStorage.setItem("buyNowItem", JSON.stringify(craft));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800 px-8 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={craft.image}
            alt={craft.name}
            className="rounded-2xl w-full max-w-md h-80 object-cover shadow-md hover:scale-105 transition"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-amber-800">{craft.name}</h1>
          <p className="text-gray-600 mt-2">
            {craft.region} • {craft.category}
          </p>
          <p className="text-3xl font-semibold text-amber-700 mt-4">
            ₹{craft.price}
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed text-justify">
            Experience the heritage of India through this handcrafted{" "}
            {craft.name.toLowerCase()}. Created with love and dedication by
            artisans from {craft.region}, this piece reflects centuries-old
            traditions of {craft.category.toLowerCase()} artistry.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate("/explore")}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              <CreditCard size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-6xl mx-auto mt-12 bg-white rounded-2xl shadow p-6">
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">
          Customer Reviews
        </h3>
        <div className="bg-[#fff8e7] p-4 rounded-xl mb-3">
          <p className="font-medium text-gray-800">
            “Beautiful craftsmanship! Absolutely loved it.”
          </p>
          <p className="text-gray-600 text-sm mt-1">— Aditi Sharma</p>
        </div>
        <div className="bg-[#fff8e7] p-4 rounded-xl">
          <p className="font-medium text-gray-800">
            “The details and colors are stunning. Worth every penny!”
          </p>
          <p className="text-gray-600 text-sm mt-1">— Rahul Verma</p>
        </div>
      </div>
    </div>
  );
}

export default CraftDetail;
