import React, { useEffect, useState } from "react";
import EmptyState from "../../../components/ui/EmptyState";
import Skeleton from "../../../components/ui/Skeleton";
import { showToast } from "../../../components/ui/toast";
import { useCart } from "../../../context/CartContext";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    const wl = JSON.parse(localStorage.getItem("wishlist") || "{}");
    setWishlist(wl[u?.id] || []);
    setTimeout(() => setLoading(false), 200);
  }, []);

  const remove = (id, source) => {
    if (!user) return;
    const wl = JSON.parse(localStorage.getItem("wishlist") || "{}");
    wl[user.id] = (wl[user.id] || []).filter((p) => !(String(p.id) === String(id) && p.source === source));
    localStorage.setItem("wishlist", JSON.stringify(wl));
    setWishlist(wl[user.id] || []);
    showToast("Removed from wishlist");
  };

  const moveToCart = (item) => {
    addToCart({ id: item.id, name: item.title || item.name, price: item.price, image: item.image, region: item.region, quantity: 1 });
    remove(item.id, item.source);
    showToast("Moved to cart");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-800">Wishlist</h1>
        <span className="text-sm text-gray-600">{wishlist?.length || 0} items</span>
      </div>
      {loading ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : (!wishlist || wishlist.length === 0) ? (
        <EmptyState title="No items yet" description="Save products to your wishlist to view them later." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {wishlist.map((p) => (
            <div key={`${p.source}-${p.id}`} className="bg-white rounded-xl border shadow-sm p-3">
              <div className="h-36 bg-gray-100 rounded mb-3 overflow-hidden flex items-center justify-center">
                {p.image ? <img src={p.image} alt={p.title || p.name} className="h-full w-full object-cover" /> : <span className="text-gray-400 text-sm">No image</span>}
              </div>
              <h4 className="font-semibold text-amber-800">{p.title || p.name}</h4>
              <p className="text-gray-600 text-sm">{p.region} • ₹{p.price}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => moveToCart(p)} className="px-3 py-1 rounded bg-amber-600 text-white hover:bg-amber-700 text-sm">Add to Cart</button>
                <button onClick={() => remove(p.id, p.source)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
