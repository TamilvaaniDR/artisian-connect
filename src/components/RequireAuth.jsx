import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function RequireAuth({ children }) {
  const user = getCurrentUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function RequireRole({ role, children }) {
  const user = getCurrentUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && user.role !== role) {
    // Redirect to their own dashboard if role mismatch
    const target = user.role === "Artisan" ? "/dashboard/artisan" : "/dashboard/user";
    return <Navigate to={target} replace />;
  }
  return children;
}
