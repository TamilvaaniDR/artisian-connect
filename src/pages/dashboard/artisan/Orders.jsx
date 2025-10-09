import React, { useCallback, useEffect, useMemo, useState } from "react";
import { showToast } from "../../../components/ui/toast";
import Skeleton from "../../../components/ui/Skeleton";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [myProductIds, setMyProductIds] = useState(new Set());
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (!raw) return;
    const user = JSON.parse(raw);
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const allProducts = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
    const mine = new Set(allProducts.filter(p => p.artisanId === user.id).map(p => p.id));
    setMyProductIds(mine);
    // Show orders that include at least one of my products (by id)
    const relevant = allOrders.filter(o => o.items.some(it => mine.has(it.id)));
    setOrders(relevant);
    setTimeout(() => setLoading(false), 200);
    const onSearch = (e) => {
      if (e.detail?.scope === "artisan") setQ(e.detail.q || "");
    };
    window.addEventListener("dashboard-search", onSearch);
    return () => window.removeEventListener("dashboard-search", onSearch);
  }, []);

  const updateStatus = (orderId, status) => {
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    const idx = all.findIndex(o => o.id === orderId);
    if (idx >= 0) {
      all[idx] = { ...all[idx], status };
      localStorage.setItem("orders", JSON.stringify(all));
      setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
      showToast("Status updated");
    }
  };

  const summarizeItems = useCallback((o) => o.items.filter((it) => myProductIds.has(it.id)), [myProductIds]);

  const filtered = useMemo(() => {
    if (!q.trim()) return orders;
    const term = q.toLowerCase();
    return orders.filter((o) =>
      String(o.id).includes(term) || summarizeItems(o).some((it) => (it.name || "").toLowerCase().includes(term))
    );
  }, [orders, q, summarizeItems]);

  const badge = (status) => {
    const map = {
      Placed: "bg-gray-100 text-gray-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Delivered: "bg-green-100 text-green-800",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-800">Orders</h1>
        <span className="text-sm text-gray-600">{filtered.length} shown</span>
      </div>
      {loading ? (
        <div className="mt-4 space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 mt-2">No orders containing your products yet.</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600 mt-2">No orders match your search.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {filtered.map(o => (
            <div key={o.id} className="border rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Order #{o.id}</p>
                  <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${badge(o.status)}`}>{o.status}</span>
                  <select
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    defaultValue={o.status}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option>Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {summarizeItems(o).map(it => (
                  <div key={`${it.id}-${it.name}`} className="flex items-center gap-3">
                    {it.image ? (
                      <img src={it.image} className="h-12 w-12 rounded object-cover" alt={it.name} />
                    ) : (
                      <div className="h-12 w-12 rounded bg-gray-100" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{it.name}</p>
                      <p className="text-xs text-gray-600">Qty: {it.quantity} • ₹{it.price}</p>
                    </div>
                    <div className="text-sm font-semibold">₹{(it.price || 0) * (it.quantity || 1)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
