import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "../../../components/ui/Skeleton";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    const uid = raw ? JSON.parse(raw).id : null;
    setOrders(all.filter((o) => !uid || o.userId === uid));
    setTimeout(() => setLoading(false), 200);
    const onSearch = (e) => {
      if (e.detail?.scope === "user") setQ(e.detail.q || "");
    };
    window.addEventListener("dashboard-search", onSearch);
    return () => window.removeEventListener("dashboard-search", onSearch);
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return orders;
    const term = q.toLowerCase();
    return orders.filter((o) =>
      String(o.id).includes(term) ||
      (o.items || []).some((it) => (it.name || "").toLowerCase().includes(term))
    );
  }, [orders, q]);

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
        <h1 className="text-2xl font-bold text-amber-800">My Orders</h1>
        <span className="text-sm text-gray-600">{filtered.length} shown</span>
      </div>
      {loading ? (
        <div className="mt-4 space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 mt-2">No orders yet.</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600 mt-2">No orders match your search.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {filtered.map((o) => (
            <div key={o.id} className="border rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Order #{o.id}</p>
                  <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${badge(o.status)}`}>{o.status}</span>
              </div>
              <div className="mt-3 space-y-2">
                {o.items.map((it) => (
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
              <div className="mt-3 text-right font-bold">Total: ₹{o.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
