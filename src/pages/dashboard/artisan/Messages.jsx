import React, { useEffect, useMemo, useState } from "react";
import EmptyState from "../../../components/ui/EmptyState";
import Skeleton from "../../../components/ui/Skeleton";

export default function Messages() {
  const [threads, setThreads] = useState([]);
  const [user, setUser] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState({}); // { [conversationId]: text }

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    const all = JSON.parse(localStorage.getItem("messages") || "[]");
    setThreads(all.filter(t => t.participants?.artisanId === u?.id));
    setTimeout(() => setLoading(false), 200);

    const onSearch = (e) => {
      if (e.detail?.scope === "artisan") setQ(e.detail.q || "");
    };
    window.addEventListener("dashboard-search", onSearch);
    return () => window.removeEventListener("dashboard-search", onSearch);
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return threads;
    const term = q.toLowerCase();
    return threads.filter((t) =>
      String(t.participants?.userId || "").includes(term) ||
      (t.messages || []).some((m) => (m.text || "").toLowerCase().includes(term))
    );
  }, [threads, q]);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-800">Messages</h1>
        <span className="text-sm text-gray-600">{filtered.length} shown</span>
      </div>
      {loading ? (
        <div className="mt-4 space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : threads.length === 0 ? (
        <EmptyState title="No messages yet" description="You will see conversations from customers here." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No results" description="Try a different search term." />
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((t) => (
            <div key={t.conversationId} className="border rounded-xl p-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Conversation #{t.conversationId}</p>
                <span className="text-xs text-gray-500">User #{t.participants?.userId}</span>
              </div>
              <div className="mt-2 space-y-1 max-h-48 overflow-auto">
                {t.messages?.map((m, idx) => (
                  <p key={idx} className="text-sm text-gray-800"><span className="font-semibold">{m.senderId === user?.id ? "You" : "User"}:</span> {m.text}</p>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = (reply[t.conversationId] || "").trim();
                  if (!text || !user) return;
                  // persist
                  const all = JSON.parse(localStorage.getItem("messages") || "[]");
                  const idx = all.findIndex((x) => x.conversationId === t.conversationId);
                  if (idx >= 0) {
                    all[idx] = {
                      ...all[idx],
                      messages: [...(all[idx].messages || []), { senderId: user.id, text, ts: new Date().toISOString() }],
                    };
                    localStorage.setItem("messages", JSON.stringify(all));
                    setThreads((prev) =>
                      prev.map((th) => (th.conversationId === t.conversationId ? all[idx] : th))
                    );
                    setReply((r) => ({ ...r, [t.conversationId]: "" }));
                  }
                }}
                className="mt-3 flex items-center gap-2"
              >
                <input
                  value={reply[t.conversationId] || ""}
                  onChange={(e) => setReply((r) => ({ ...r, [t.conversationId]: e.target.value }))}
                  placeholder="Type a reply"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
                <button type="submit" className="px-3 py-2 rounded-lg bg-amber-600 text-white text-sm hover:bg-amber-700">Send</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
