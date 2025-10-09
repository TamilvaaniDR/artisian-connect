import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import crafts from "../data/crafts";
import ProductCard from "../components/ui/ProductCard";
import ProductGrid from "../components/ui/ProductGrid";
import CategoryBar from "../components/CategoryBar";

function Explore() {
  const location = useLocation();
  const categories = ["All", "Weaving", "Pottery", "Painting", "Basketry", "Metalwork"];
  const regions = [
    "All",
    "Punjab",
    "Tamil Nadu",
    "Odisha",
    "Assam",
    "Bihar",
    "West Bengal",
    "Rajasthan",
    "Kerala",
  ];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const list = useMemo(() => {
    let arr = crafts.map((c) => ({ ...c, rating: c.rating || 4.5 }));
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
      );
    }
    if (category !== "All") arr = arr.filter((c) => c.category === category);
    if (region !== "All") arr = arr.filter((c) => c.region === region);
    if (priceMin !== "") arr = arr.filter((c) => c.price >= Number(priceMin));
    if (priceMax !== "") arr = arr.filter((c) => c.price <= Number(priceMax));
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    else if (sort === "rating-desc") arr = [...arr].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return arr;
  }, [query, category, region, priceMin, priceMax, sort]);

  // Initialize query from URL (?q=)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setQuery(q);
    setPage(1);
  }, [location.search]);

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }, [list, page]);

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800">
      <CategoryBar categories={categories} active={category} onSelect={(c) => { setCategory(c); setPage(1); }} />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-3 bg-white rounded-2xl shadow p-4 h-max">
          <h2 className="text-lg font-bold text-amber-800 mb-2">Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search products" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="w-full border rounded-lg px-3 py-2">
                {categories.map((c) => (<option key={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Region</label>
              <select value={region} onChange={(e) => { setRegion(e.target.value); setPage(1); }} className="w-full border rounded-lg px-3 py-2">
                {regions.map((r) => (<option key={r}>{r}</option>))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Min ₹</label>
                <input type="number" value={priceMin} onChange={(e) => { setPriceMin(e.target.value); setPage(1); }} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Max ₹</label>
                <input type="number" value={priceMax} onChange={(e) => { setPriceMax(e.target.value); setPage(1); }} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sort</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="md:col-span-9">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-amber-800">{list.length} results</h1>
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
          </div>
          <ProductGrid>
            {paged.map((c) => (
              <ProductCard key={c.id} item={{ id: c.id, name: c.name, image: c.image, region: c.region, category: c.category, price: c.price, rating: c.rating }} source="catalog" />
            ))}
          </ProductGrid>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), Math.max(0, page - 3) + 5).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded border ${p === page ? 'bg-amber-600 text-white border-amber-600' : ''}`}>{p}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Explore;
