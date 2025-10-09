import React, { useEffect, useMemo, useState } from "react";
import EmptyState from "../../../components/ui/EmptyState";
import Skeleton from "../../../components/ui/Skeleton";

export default function Feedback() {
  const [currentUser, setCurrentUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (!raw) return;
    const user = JSON.parse(raw);
    setCurrentUser(user);
    const list = JSON.parse(localStorage.getItem("feedback") || "[]");
    setFeedback(list.filter((f) => f.toArtisanId === user.id));
    setTimeout(() => setLoading(false), 200);
    const onSearch = (e) => {
      if (e.detail?.scope === "artisan") setQ(e.detail.q || "");
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
      String(f.fromUserId || "").includes(term) ||
      (f.comment || "").toLowerCase().includes(term)
    );
  }, [feedback, q]);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-800">Feedback</h1>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          {avg && <span>Avg: <strong>{avg}</strong> / 5</span>}
          <span>{filtered.length} shown</span>
        </div>
      </div>
      {loading ? (
        <div className="mt-4 space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : feedback.length === 0 ? (
        <EmptyState title="No feedback yet" description="Customers’ feedback will appear here." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No results" description="Try a different search term." />
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((f) => (
            <div key={f.id} className="bg-[#fff8e7] rounded-xl p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-amber-800">{f.fromName || "User"}</h4>
                <span className="text-sm">⭐ {f.rating}</span>
              </div>
              <p className="text-gray-700 mt-1">{f.comment}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(f.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
