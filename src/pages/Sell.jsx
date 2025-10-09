import React, { useState } from "react";

export default function Sell() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    region: "",
    price: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center">Sell Your Craft</h1>

        {submitted ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
            Thank you! Your craft submission has been received (mock).
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="e.g., Handwoven Saree"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
                >
                  <option value="">Select category</option>
                  <option>Weaving</option>
                  <option>Pottery</option>
                  <option>Painting</option>
                  <option>Basketry</option>
                  <option>Metalwork</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <select
                  name="region"
                  value={form.region}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
                >
                  <option value="">Select region</option>
                  <option>Punjab</option>
                  <option>Tamil Nadu</option>
                  <option>Odisha</option>
                  <option>Assam</option>
                  <option>Bihar</option>
                  <option>West Bengal</option>
                  <option>Rajasthan</option>
                  <option>Kerala</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="e.g., 2500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="Describe your craft, story, and materials used"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg text-white font-semibold bg-amber-600 hover:bg-amber-700"
              >
                Submit Craft
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
