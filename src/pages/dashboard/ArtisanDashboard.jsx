import React, { useEffect, useMemo, useState } from "react";

export default function ArtisanDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState({ displayName: "", bio: "" });
  const [productForm, setProductForm] = useState({
    title: "",
    category: "",
    region: "",
    price: "",
    imageUrl: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // Load session and data
  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (raw) {
      const user = JSON.parse(raw);
      setCurrentUser(user);
      // Profile
      const profiles = JSON.parse(localStorage.getItem("artisanProfiles") || "{}");
      setProfile(profiles[user.id] || { displayName: user.fullName || "", bio: "" });
      // Products
      const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
      setProducts(all.filter((p) => p.artisanId === user.id));
      // Feedback
      const fb = JSON.parse(localStorage.getItem("feedback") || "[]");
      setFeedback(fb.filter((f) => f.toArtisanId === user.id));
    }
  }, []);

  const onProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((s) => ({ ...s, [name]: value }));
  };

  const saveProfile = () => {
    if (!currentUser) return;
    const profiles = JSON.parse(localStorage.getItem("artisanProfiles") || "{}");
    profiles[currentUser.id] = { ...profile };
    localStorage.setItem("artisanProfiles", JSON.stringify(profiles));
    alert("Profile saved");
  };

  const onProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm((s) => ({ ...s, [name]: value }));
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const newProduct = {
      id: Date.now(),
      artisanId: currentUser.id,
      artisanName: profile.displayName || currentUser.fullName || "Artisan",
      title: productForm.title,
      category: productForm.category,
      region: productForm.region,
      price: Number(productForm.price || 0),
      imageUrl: productForm.imageUrl,
      description: productForm.description,
    };
    const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
    all.push(newProduct);
    localStorage.setItem("artisanProducts", JSON.stringify(all));
    setProducts(all.filter((p) => p.artisanId === currentUser.id));
    setProductForm({ title: "", category: "", region: "", price: "", imageUrl: "", description: "" });
  };

  const myAverageRating = useMemo(() => {
    if (!feedback.length) return null;
    const sum = feedback.reduce((s, f) => s + (Number(f.rating) || 0), 0);
    return (sum / feedback.length).toFixed(1);
  }, [feedback]);

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800 px-6 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Artisan Dashboard</h1>

      {/* Profile */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              name="displayName"
              value={profile.displayName}
              onChange={onProfileChange}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={profile.bio}
              onChange={onProfileChange}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
            />
          </div>
        </div>
        <button onClick={saveProfile} className="mt-4 px-5 py-2 rounded-lg text-white bg-amber-600 hover:bg-amber-700">
          Save Profile
        </button>
      </section>

      {/* Add Product */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">Add Product</h2>
        <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input name="title" value={productForm.title} onChange={onProductChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={productForm.category} onChange={onProductChange} className="mt-1 w-full border rounded-lg px-3 py-2">
              <option value="">Select category</option>
              <option>Weaving</option>
              <option>Pottery</option>
              <option>Painting</option>
              <option>Basketry</option>
              <option>Metalwork</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <select name="region" value={productForm.region} onChange={onProductChange} className="mt-1 w-full border rounded-lg px-3 py-2">
              <option value="">Select region</option>
              <option>Punjab</option>
              <option>Tamil Nadu</option>
              <option>Odisha</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>West Bengal</option>
              <option>Rajasthan</option>
              <option>Kerala</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input name="price" type="number" value={productForm.price} onChange={onProductChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input name="imageUrl" value={productForm.imageUrl} onChange={onProductChange} className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows={3} value={productForm.description} onChange={onProductChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="px-5 py-2 rounded-lg text-white bg-amber-600 hover:bg-amber-700">Add Product</button>
          </div>
        </form>
      </section>

      {/* My Products */}
      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">My Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border shadow-sm p-3">
                <div className="h-40 w-full bg-gray-100 rounded-md overflow-hidden mb-3 flex items-center justify-center">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
                <h4 className="font-semibold text-amber-800">{p.title}</h4>
                <p className="text-gray-600 text-sm">{p.region} • {p.category}</p>
                <p className="text-amber-700 font-bold mt-1">₹{p.price}</p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{p.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback */}
      <section className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-amber-700">Feedback</h2>
          {myAverageRating && (
            <span className="text-sm text-gray-700">Average rating: <strong>{myAverageRating}</strong> / 5</span>
          )}
        </div>
        {feedback.length === 0 ? (
          <p className="text-gray-600">No feedback yet.</p>
        ) : (
          <div className="space-y-3">
            {feedback.map((f) => (
              <div key={f.id} className="bg-[#fff8e7] rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-amber-800">{f.fromName || "User"}</h4>
                  <span className="text-sm">⭐ {f.rating}</span>
                </div>
                <p className="text-gray-700 mt-1">{f.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
