import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
    isActive ? "bg-amber-100 text-amber-800" : "text-gray-700 hover:bg-gray-100"
  }`;

export default function UserLayout() {
  const [q, setQ] = useState("");
  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3 lg:col-span-3 bg-white rounded-2xl shadow p-4 h-max sticky top-20">
          <h2 className="text-xl font-bold text-amber-800 mb-3">User Panel</h2>
          <nav className="space-y-1">
            <NavLink to="/dashboard/user" end className={linkClass}>Overview</NavLink>
            <NavLink to="/dashboard/user/orders" className={linkClass}>Orders</NavLink>
            <NavLink to="/dashboard/user/wishlist" className={linkClass}>Wishlist</NavLink>
            <NavLink to="/dashboard/user/messages" className={linkClass}>Messages</NavLink>
            <NavLink to="/dashboard/user/feedback" className={linkClass}>Feedback</NavLink>
            <NavLink to="/dashboard/user/profile" className={linkClass}>Profile</NavLink>
            <NavLink to="/dashboard/user/settings" className={linkClass}>Settings</NavLink>
          </nav>
        </aside>
        <main className="md:col-span-9 lg:col-span-9">
          <div className="bg-white rounded-2xl shadow p-4 mb-4 flex items-center gap-3">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-amber-800">My Dashboard</h1>
              <p className="text-xs text-gray-500">Orders, wishlist and more</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("dashboard-search", { detail: { scope: "user", q } }));
              }}
              className="hidden md:block"
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search in dashboard"
                className="border rounded-full px-4 py-2 text-sm w-72"
              />
            </form>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
