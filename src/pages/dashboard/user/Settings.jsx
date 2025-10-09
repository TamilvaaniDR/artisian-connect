import React, { useEffect, useState } from "react";
import { showToast } from "../../../components/ui/toast";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [notify, setNotify] = useState({ orders: true, messages: true, promos: false });
  const [privacy, setPrivacy] = useState({ showPublicProfile: true });
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", pincode: "" });

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    if (!u) return;
    const store = JSON.parse(localStorage.getItem("userSettings") || "{}");
    const s = store[u.id] || {};
    setNotify({
      orders: s.orders ?? true,
      messages: s.messages ?? true,
      promos: s.promos ?? false,
    });
    setPrivacy({ showPublicProfile: s.showPublicProfile ?? true });
    setAddress({
      line1: s.line1 || "",
      line2: s.line2 || "",
      city: s.city || "",
      state: s.state || "",
      pincode: s.pincode || "",
    });
  }, []);

  const saveAll = () => {
    if (!user) return;
    const store = JSON.parse(localStorage.getItem("userSettings") || "{}");
    store[user.id] = { ...notify, ...privacy, ...address };
    localStorage.setItem("userSettings", JSON.stringify(store));
    showToast("Settings saved");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-8">
      <h1 className="text-2xl font-bold text-amber-800">Settings</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={notify.orders} onChange={(e)=>setNotify(s=>({...s, orders: e.target.checked}))} />
            Order updates
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={notify.messages} onChange={(e)=>setNotify(s=>({...s, messages: e.target.checked}))} />
            New messages
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={notify.promos} onChange={(e)=>setNotify(s=>({...s, promos: e.target.checked}))} />
            Promotions and offers
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Privacy</h2>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={privacy.showPublicProfile} onChange={(e)=>setPrivacy({ showPublicProfile: e.target.checked })} />
          Show my public profile
        </label>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Default Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input value={address.line1} onChange={(e)=>setAddress(s=>({...s, line1: e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input value={address.line2} onChange={(e)=>setAddress(s=>({...s, line2: e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input value={address.city} onChange={(e)=>setAddress(s=>({...s, city: e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input value={address.state} onChange={(e)=>setAddress(s=>({...s, state: e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input value={address.pincode} onChange={(e)=>setAddress(s=>({...s, pincode: e.target.value}))} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
      </section>

      <div>
        <button onClick={saveAll} className="px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Save Settings</button>
      </div>
    </div>
  );
}
