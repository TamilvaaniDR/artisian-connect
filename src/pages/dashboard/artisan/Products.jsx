import React, { useEffect, useMemo, useState } from "react";
import { showToast } from "../../../components/ui/toast";

export default function Products() {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", region: "", price: "", imageUrl: "", description: "" });
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null); // product being edited

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (raw) {
      const user = JSON.parse(raw);
      setCurrentUser(user);
      const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
      setProducts(all.filter((p) => p.artisanId === user.id));
    }
    const onSearch = (e) => {
      if (e.detail?.scope === "artisan") setQ(e.detail.q || "");
    };
    window.addEventListener("dashboard-search", onSearch);
    return () => window.removeEventListener("dashboard-search", onSearch);
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return products;
    const term = q.toLowerCase();
    return products.filter((p) =>
      (p.title || "").toLowerCase().includes(term) ||
      (p.category || "").toLowerCase().includes(term) ||
      (p.region || "").toLowerCase().includes(term)
    );
  }, [products, q]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
    const newProduct = {
      id: Date.now(),
      artisanId: currentUser.id,
      artisanName: currentUser.fullName || "Artisan",
      ...form,
      price: Number(form.price || 0),
    };
    all.push(newProduct);
    localStorage.setItem("artisanProducts", JSON.stringify(all));
    setProducts(all.filter((p) => p.artisanId === currentUser.id));
    setForm({ title: "", category: "", region: "", price: "", imageUrl: "", description: "" });
    showToast("Product added");
  };

  const deleteProduct = (id) => {
    const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
    const next = all.filter((p) => p.id !== id);
    localStorage.setItem("artisanProducts", JSON.stringify(next));
    setProducts(next.filter((p) => p.artisanId === currentUser.id));
    showToast("Product deleted");
  };

  const startEdit = (p) => {
    setEditing({ ...p });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editing || !currentUser) return;
    const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
    const idx = all.findIndex((p) => p.id === editing.id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], ...editing, price: Number(editing.price || 0) };
      localStorage.setItem("artisanProducts", JSON.stringify(all));
      setProducts(all.filter((p) => p.artisanId === currentUser.id));
      setEditing(null);
      showToast("Changes saved");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amber-800">My Products</h1>
          <span className="text-sm text-gray-600">{filtered.length} shown</span>
        </div>
        {products.length === 0 ? (
          <p className="text-gray-600 mt-2">No products yet.</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-600 mt-2">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border shadow-sm p-3">
                <div className="h-36 bg-gray-100 rounded mb-3 overflow-hidden flex items-center justify-center">
                  {p.imageUrl ? <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" /> : <span className="text-gray-400 text-sm">No image</span>}
                </div>
                <h4 className="font-semibold text-amber-800">{p.title}</h4>
                <p className="text-gray-600 text-sm">{p.region} • {p.category}</p>
                <p className="text-amber-700 font-bold mt-1">₹{p.price}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => startEdit(p)} className="px-3 py-1 rounded bg-amber-600 text-white hover:bg-amber-700 text-sm">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">Add New Product</h2>
        <form onSubmit={saveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input name="title" value={form.title} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={form.category} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2">
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
            <select name="region" value={form.region} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2">
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
            <input name="price" type="number" value={form.price} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Save Product</button>
          </div>
        </form>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-amber-800">Edit Product</h3>
              <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={saveEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input value={editing.title} onChange={(e)=>setEditing(s=>({...s, title:e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input value={editing.category} onChange={(e)=>setEditing(s=>({...s, category:e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <input value={editing.region} onChange={(e)=>setEditing(s=>({...s, region:e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input type="number" value={editing.price} onChange={(e)=>setEditing(s=>({...s, price:e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input value={editing.imageUrl} onChange={(e)=>setEditing(s=>({...s, imageUrl:e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea rows={3} value={editing.description} onChange={(e)=>setEditing(s=>({...s, description:e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="md:col-span-2 flex gap-3 justify-end">
                <button type="button" onClick={()=>setEditing(null)} className="px-5 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
