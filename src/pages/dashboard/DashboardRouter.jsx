import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (!raw) {
      navigate("/login", { replace: true });
      return;
    }
    try {
      const user = JSON.parse(raw);
      if (user?.role === "Artisan") navigate("/dashboard/artisan", { replace: true });
      else navigate("/dashboard/user", { replace: true });
    } catch {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf3]">
      <p className="text-gray-700">Redirecting to your dashboard...</p>
    </div>
  );
}
