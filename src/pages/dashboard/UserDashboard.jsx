import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import crafts from "../../data/crafts";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [currentUser, setCurrentUser] = useState(null);
  const [profiles, setProfiles] = useState({});
  const [feedbackForm, setFeedbackForm] = useState({ artisanId: "", rating: "5", comment: "" });

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (!raw) {
      navigate("/login", { replace: true });
      return;
    }
    setCurrentUser(JSON.parse(raw));

    const prof = JSON.parse(localStorage.getItem("artisanProfiles") || "{}");
    setProfiles(prof);
  }, [navigate]);

  const artisanList = useMemo(() => {
    return Object.entries(profiles).map(([id, p]) => ({ id: Number(id), ...p }));
  }, [profiles]);

  const customProducts = useMemo(() => {
    const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
    return all;
  }, []);

  // Merge predefined crafts and custom products
  const products = useMemo(() => {
    const craftProducts = crafts.map((c) => ({
      id: c.id,
      title: c.name,
      region: c.region,
      category: c.category,
      price: c.price,
      image: c.image,
      source: "catalog",
      artisanId: null,
      artisanName: c.region + " artisan",
      description: `${c.name} from ${c.region}`,
    }));

    const mappedCustom = customProducts.map((p) => ({
      id: p.id,
      title: p.title,
      region: p.region,
      category: p.category,
      price: p.price,
      image: p.imageUrl || "",
      source: "artisan",
      artisanId: p.artisanId,
      artisanName: p.artisanName,
      description: p.description,
    }));

    return [...mappedCustom, ...craftProducts];
  }, [customProducts]);

  const buyNow = (item) => {
    localStorage.setItem("buyNowItem", JSON.stringify({
      name: item.title,
      region: item.region,
      price: item.price,
      image: item.image,
    }));
    navigate("/payment");
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const list = JSON.parse(localStorage.getItem("feedback") || "[]");
    list.push({
      id: Date.now(),
      toArtisanId: Number(feedbackForm.artisanId),
      fromUserId: currentUser.id,
      fromName: currentUser.fullName || "User",
      rating: Number(feedbackForm.rating),
      comment: feedbackForm.comment,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("feedback", JSON.stringify(list));
    setFeedbackForm({ artisanId: "", rating: "5", comment: "" });
    alert("Feedback submitted (mock)");
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800 px-6 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">User Dashboard</h1>

      {/* Products */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={`${p.source}-${p.id}`} className="bg-white rounded-xl border shadow-sm p-3">
                <div className="h-40 w-full bg-gray-100 rounded-md overflow-hidden mb-3 flex items-center justify-center">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
                <h4 className="font-semibold text-amber-800">{p.title}</h4>
                <p className="text-gray-600 text-sm">{p.region} • {p.category}</p>
                {p.artisanName && (
                  <p className="text-gray-600 text-sm">By: {p.artisanName}</p>
                )}
                <p className="text-amber-700 font-bold mt-1">₹{p.price}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart({ id: p.id, name: p.title, price: p.price, region: p.region, image: p.image })}
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => window.location.assign(`/product/${p.source}/${p.id}`)}
                    className="flex-1 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => buyNow({ name: p.title, price: p.price, region: p.region, image: p.image })}
                    className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Artisans */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">Artisans</h2>
        {artisanList.length === 0 ? (
          <p className="text-gray-600">No artisans yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artisanList.map((a) => (
              <div key={a.id} className="bg-white rounded-xl border shadow-sm p-3">
                <h4 className="font-semibold text-amber-800">{a.displayName || "Artisan"}</h4>
                <p className="text-gray-600 text-sm mt-1">{a.bio || "No bio provided."}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Give Feedback */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">Give Feedback</h2>
        <form onSubmit={submitFeedback} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Artisan</label>
            <select
              value={feedbackForm.artisanId}
              onChange={(e) => setFeedbackForm((s) => ({ ...s, artisanId: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select artisan</option>
              {artisanList.map((a) => (
                <option key={a.id} value={a.id}>{a.displayName || `Artisan ${a.id}`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <select
              value={feedbackForm.rating}
              onChange={(e) => setFeedbackForm((s) => ({ ...s, rating: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              {[5,4,3,2,1].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              value={feedbackForm.comment}
              onChange={(e) => setFeedbackForm((s) => ({ ...s, comment: e.target.value }))}
              rows={3}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="Share your experience..."
              required
            />
          </div>
          <div className="md:col-span-3">
            <button type="submit" className="px-5 py-2 rounded-lg text-white bg-amber-600 hover:bg-amber-700">Submit Feedback</button>
          </div>
        </form>
      </section>
    </div>
  );
}
