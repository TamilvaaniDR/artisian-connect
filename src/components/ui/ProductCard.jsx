import React from "react";
import RatingStars from "./RatingStars";
import { Link } from "react-router-dom";

export default function ProductCard({ item, source = "catalog", onAddToCart, onWishlist }) {
  return (
    <div className="group bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative h-52 bg-gray-100">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">{item.region} • {item.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-amber-700">₹{item.price}</span>
          <RatingStars value={item.rating || 4.5} />
        </div>
        <div className="mt-3 flex gap-2">
          <Link to={`/product/${source}/${item.id}`} className="flex-1 text-center px-3 py-2 rounded-lg border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-medium">View</Link>
          <button onClick={() => onAddToCart?.(item)} className="px-3 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 font-medium">Add</button>
          {onWishlist && (
            <button onClick={() => onWishlist(item)} className="px-3 py-2 rounded-lg bg-white border text-gray-700 hover:bg-gray-50">❤</button>
          )}
        </div>
      </div>
    </div>
  );
}
