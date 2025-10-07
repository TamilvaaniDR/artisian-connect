import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "Customer" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = (values) => {
    const errs = {};
    if (!values.email) errs.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Invalid email.";
    if (!values.password) errs.password = "Password is required.";
    if (!values.role) errs.role = "Select role.";
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const found = users.find(
        (u) => u.email === form.email && u.password === form.password && u.role === form.role
      );

      if (!found) {
        setErrors({ general: "Invalid credentials for the selected role." });
        setLoading(false);
        return;
      }

      // store session
      localStorage.setItem("currentUser", JSON.stringify(found));
      setLoading(false);

      // ✅ redirect to home (not dashboard)
      navigate("/");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-amber-800 mb-2">Welcome back</h2>
        <p className="text-gray-600 mb-6">Log in to continue.</p>

        {errors.general && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{errors.general}</div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
              >
                <option value="Customer">Customer</option>
                <option value="Artisan">Artisan</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white font-semibold ${
                  loading ? "bg-gray-400" : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-sm text-amber-700 underline"
              >
                Create an account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
