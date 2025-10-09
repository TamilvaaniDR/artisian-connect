import React, { useEffect, useMemo, useState } from "react";
import EmptyState from "../../../components/ui/EmptyState";
import Skeleton from "../../../components/ui/Skeleton";
import { showToast } from "../../../components/ui/toast";

export default function UserFeedback() {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ itemKey: "", rating: 5, comment: "" });
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(null); // feedback entry being edited

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    const list = JSON.parse(localStorage.getItem("feedback") || "[]");
    setFeedback(list.filter((f) => f.fromUserId === u?.id));
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const uid = u?.id;
    setOrders(allOrders.filter((o) => uid && o.userId === uid));
    setTimeout(() => setLoading(false), 200);
    const onSearch = (e) => {
      if (e.detail?.scope === "user") setQ(e.detail.q || "");
    };
    window.addEventListener("dashboard-search", onSearch);
    return () => window.removeEventListener("dashboard-search", onSearch);
  }, []);

  const avg = useMemo(() => {
    if (!feedback.length) return null;
    const sum = feedback.reduce((s, f) => s + (Number(f.rating) || 0), 0);
    return (sum / feedback.length).toFixed(1);
  }, [feedback]);

  const filtered = useMemo(() => {
    if (!q.trim()) return feedback;
    const term = q.toLowerCase();
    return feedback.filter((f) =>
      String(f.toArtisanId || "").includes(term) || (f.comment || "").toLowerCase().includes(term)
    );
  }, [feedback, q]);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-800">My Feedback</h1>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          {avg && <span>Avg Given: <strong>{avg}</strong> / 5</span>}
          <span>{filtered.length} shown</span>
        </div>
      </div>
      <div className="mt-3">
        <button onClick={() => { setOpen(true); setEditing(null); }} className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 text-sm">Write Feedback</button>
      </div>
      {loading ? (
        <div className="mt-4 space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : feedback.length === 0 ? (
        <EmptyState title="No feedback yet" description="You haven't submitted any feedback." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No results" description="Try a different search term." />
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((f) => (
            <div key={f.id} className="rounded-xl p-3 border">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-amber-800">To artisan #{f.toArtisanId}</h4>
                <span className="text-sm">⭐ {f.rating}</span>
              </div>
              <p className="text-gray-700 mt-1">{f.comment}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(f.createdAt).toLocaleString()}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    setEditing(f);
                    setForm({ itemKey: "", rating: f.rating, comment: f.comment });
                    setOpen(true);
                  }}
                  className="px-3 py-1 rounded bg-amber-100 text-amber-800 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    const list = JSON.parse(localStorage.getItem("feedback") || "[]");
                    const next = list.filter((x) => x.id !== f.id);
                    localStorage.setItem("feedback", JSON.stringify(next));
                    setFeedback(next.filter((x) => x.fromUserId === user?.id));
                    showToast("Feedback deleted");
                  }}
                  className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Write Feedback Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-amber-800">{editing ? "Edit Feedback" : "Write Feedback"}</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!user) return;
                const errs = {};
                if (!editing && !form.itemKey) errs.itemKey = "Please select an order item.";
                if (!form.comment.trim()) errs.comment = "Comment is required.";
                setErrors(errs);
                if (Object.keys(errs).length) return;

                const list = JSON.parse(localStorage.getItem("feedback") || "[]");

                if (editing) {
                  const idx = list.findIndex((x) => x.id === editing.id);
                  if (idx >= 0) {
                    list[idx] = { ...list[idx], rating: Number(form.rating || 0), comment: form.comment };
                  }
                  localStorage.setItem("feedback", JSON.stringify(list));
                  setFeedback(list.filter((f) => f.fromUserId === user.id));
                  showToast("Feedback updated");
                } else {
                  const [orderId, itemId] = (form.itemKey || "").split(":");
                  const order = orders.find((o) => String(o.id) === orderId);
                  const item = order?.items.find((it) => String(it.id) === itemId);
                  if (!item) return;
                  const artisanProducts = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
                  const matched = artisanProducts.find((p) => String(p.id) === String(item.id));
                  const toArtisanId = matched?.artisanId || null;
                  const entry = {
                    id: Date.now(),
                    fromUserId: user.id,
                    fromName: user.fullName || user.email,
                    toArtisanId,
                    rating: Number(form.rating || 0),
                    comment: form.comment,
                    createdAt: new Date().toISOString(),
                  };
                  list.push(entry);
                  localStorage.setItem("feedback", JSON.stringify(list));
                  setFeedback(list.filter((f) => f.fromUserId === user.id));
                  showToast("Feedback submitted");
                }

                setOpen(false);
                setForm({ itemKey: "", rating: 5, comment: "" });
                setEditing(null);
              }}
              className="grid grid-cols-1 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Order Item</label>
                {editing ? (
                  <div className="text-sm text-gray-600">Editing previous feedback</div>
                ) : (
                  <>
                    <select
                      value={form.itemKey}
                      onChange={(e) => setForm((s) => ({ ...s, itemKey: e.target.value }))}
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">Select an item</option>
                      {orders.map((o) => (
                        o.items.map((it) => (
                          <option key={`${o.id}:${it.id}`} value={`${o.id}:${it.id}`}>
                            Order #{o.id} • {it.name} (₹{it.price})
                          </option>
                        ))
                      ))}
                    </select>
                    {errors.itemKey && <p className="mt-1 text-xs text-red-600">{errors.itemKey}</p>}
                  </>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm((s) => ({ ...s, rating: e.target.value }))}
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                  >
                    {[5,4,3,2,1].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">&nbsp;</label>
                  <div className="text-sm text-gray-600">5 = Excellent, 1 = Poor</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  required
                  rows={3}
                  value={form.comment}
                  onChange={(e) => setForm((s) => ({ ...s, comment: e.target.value }))}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
                {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment}</p>}
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">{editing ? "Save Changes" : "Submit"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
