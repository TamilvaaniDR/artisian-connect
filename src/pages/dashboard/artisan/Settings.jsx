import React, { useEffect, useState } from "react";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState({ shopName: "", shippingRegions: [], returnPolicy: "" });
  const [account, setAccount] = useState({ contactEmail: "", phone: "" });

  const allRegions = [
    "Punjab",
    "Tamil Nadu",
    "Odisha",
    "Assam",
    "Bihar",
    "West Bengal",
    "Rajasthan",
    "Kerala",
  ];

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    if (!u) return;
    const store = JSON.parse(localStorage.getItem("artisanSettings") || "{}");
    const s = store[u.id] || {};
    setShop({
      shopName: s.shopName || "",
      shippingRegions: s.shippingRegions || [],
      returnPolicy: s.returnPolicy || "",
    });
    setAccount({
      contactEmail: s.contactEmail || u.email || "",
      phone: s.phone || "",
    });
  }, []);

  const toggleRegion = (r) => {
    setShop((prev) => {
      const exists = prev.shippingRegions.includes(r);
      const next = exists
        ? prev.shippingRegions.filter((x) => x !== r)
        : [...prev.shippingRegions, r];
      return { ...prev, shippingRegions: next };
    });
  };

  const saveAll = () => {
    if (!user) return;
    const store = JSON.parse(localStorage.getItem("artisanSettings") || "{}");
    store[user.id] = { ...shop, ...account };
    localStorage.setItem("artisanSettings", JSON.stringify(store));
    alert("Settings saved");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
      <h1 className="text-2xl font-bold text-amber-800">Settings</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Shop</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Shop Name</label>
            <input
              value={shop.shopName}
              onChange={(e) => setShop((s) => ({ ...s, shopName: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Return Policy</label>
            <input
              value={shop.returnPolicy}
              onChange={(e) => setShop((s) => ({ ...s, returnPolicy: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="e.g., 7-day returns for unused items"
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Shipping Regions</p>
            <div className="flex flex-wrap gap-2">
              {allRegions.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => toggleRegion(r)}
                  className={`px-3 py-1 rounded-full text-sm border ${shop.shippingRegions.includes(r) ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-white hover:bg-gray-50"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              value={account.contactEmail}
              onChange={(e) => setAccount((s) => ({ ...s, contactEmail: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              value={account.phone}
              onChange={(e) => setAccount((s) => ({ ...s, phone: e.target.value }))}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </section>

      <div>
        <button onClick={saveAll} className="px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Save Settings</button>
      </div>
    </div>
  );
}
