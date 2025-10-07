import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Customer",
  craftCategory: "",
  region: "",
  bio: "",
};

export default function Signup() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errs = {};
    if (!values.fullName || values.fullName.trim().length < 3) {
      errs.fullName = "Full name must be at least 3 characters.";
    }
    if (!values.email) {
      errs.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errs.email = "Email is invalid.";
    }
    if (!values.password || values.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    if (values.password !== values.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    if (!values.role) {
      errs.role = "Role is required.";
    }
    if (values.role === "Artisan") {
      if (!values.craftCategory) errs.craftCategory = "Select a craft category.";
      if (!values.region) errs.region = "Select your region.";
      if (values.bio && values.bio.length > 150) {
        errs.bio = "Bio cannot exceed 150 characters.";
      }
    }
    return errs;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      setErrors({ email: "An account with this email already exists." });
      setSubmitting(false);
      return;
    }

    const userToSave = {
      id: Date.now(),
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      role: form.role,
      craftCategory: form.craftCategory,
      region: form.region,
      bio: form.bio,
    };

    users.push(userToSave);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(userToSave));
    setSubmitting(false);

    // ✅ Always go to home page after signup
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Create an account</h2>
        <p className="text-gray-600 mb-6">Sign up as a customer or artisan.</p>

        <form onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

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

            <div className="grid grid-cols-2 gap-3">
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
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={onChange}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
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

            {form.role === "Artisan" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Craft Category</label>
                  <select
                    name="craftCategory"
                    value={form.craftCategory}
                    onChange={onChange}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 ${
                      errors.craftCategory ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select category</option>
                    <option>Weaving</option>
                    <option>Pottery</option>
                    <option>Painting</option>
                    <option>Basketry</option>
                    <option>Metalwork</option>
                  </select>
                  {errors.craftCategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.craftCategory}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <select
                    name="region"
                    value={form.region}
                    onChange={onChange}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 ${
                      errors.region ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select region</option>
                    <option>Punjab</option>
                    <option>Tamil Nadu</option>
                    <option>Odisha</option>
                    <option>Assam</option>
                    <option>Bihar</option>
                    <option>Rajasthan</option>
                  </select>
                  {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Short bio (optional)</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={onChange}
                    rows={3}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 ${
                      errors.bio ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="A short intro about your craft"
                  />
                  {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                </div>
              </>
            )}

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 rounded-lg text-white font-semibold ${
                  submitting ? "bg-gray-400" : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {submitting ? "Creating..." : "Create account"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-amber-700 underline"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
