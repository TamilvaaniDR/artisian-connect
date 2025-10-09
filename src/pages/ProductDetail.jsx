import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import crafts from "../data/crafts";

function ProductDetail() {
  const { id, source } = useParams();
  const { addToCart } = useCart();
  const [user, setUser] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const product = useMemo(() => {
    const pid = parseInt(id);
    // If explicit source says artisan, look in localStorage artisanProducts
    if (source === "artisan") {
      const all = JSON.parse(localStorage.getItem("artisanProducts") || "[]");
      const found = all.find((p) => p.id === pid);
      if (!found) return null;
      return {
        id: found.id,
        name: found.title,
        region: found.region,
        category: found.category,
        price: found.price,
        image: found.imageUrl,
        description: found.description,
        artisanName: found.artisanName,
        _source: "artisan",
      };
    }
    // Fallback: treat as catalog
    const c = crafts.find((c) => c.id === pid);
    if (!c) return null;
    return {
      id: c.id,
      name: c.name,
      region: c.region,
      category: c.category,
      price: c.price,
      image: c.image,
      description: `${c.name} from ${c.region}`,
      artisanName: `${c.region} artisan`,
      _source: "catalog",
    };
  }, [id, source]);

  // Load user and wishlist state
  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      const u = raw ? JSON.parse(raw) : null;
      setUser(u);
      if (u && product) {
        const wl = JSON.parse(localStorage.getItem("wishlist") || "{}");
        const list = wl[u.id] || [];
        const exists = list.find((p) => String(p.id) === String(product.id) && p.source === (product._source || source || "catalog"));
        setWishlisted(!!exists);
      } else {
        setWishlisted(false);
      }
    } catch {
      setWishlisted(false);
    }
  }, [product, source]);

  const toggleWishlist = () => {
    if (!user) {
      alert("Please login to use wishlist.");
      return;
    }
    const wl = JSON.parse(localStorage.getItem("wishlist") || "{}");
    const key = user.id;
    const list = wl[key] || [];
    const src = product._source || source || "catalog";
    const idx = list.findIndex((p) => String(p.id) === String(product.id) && p.source === src);
    if (idx >= 0) {
      list.splice(idx, 1);
      setWishlisted(false);
    } else {
      list.push({ id: product.id, title: product.name, price: product.price, image: product.image, region: product.region, source: src });
      setWishlisted(true);
    }
    wl[key] = list;
    localStorage.setItem("wishlist", JSON.stringify(wl));
  };

  if (!product) {
    return <h2 className="text-center text-red-600 mt-10">Product not found!</h2>;
  }

  const [activeImg, setActiveImg] = useState("");
  const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });

  useEffect(() => {
    if (product?.image) setActiveImg(product.image);
  }, [product]);

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800">
      {/* Product Detail Section */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="w-full">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
              {[product.image].filter(Boolean).map((src, idx) => (
                <button
                  type="button"
                  key={`${src}-${idx}`}
                  onClick={() => setActiveImg(src)}
                  className={`h-20 w-20 rounded-lg overflow-hidden border ${activeImg === src ? "border-amber-600" : "border-transparent"}`}
                >
                  <img src={src} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image with zoom */}
            <div className="flex-1 order-1 lg:order-2">
              <div
                className="rounded-2xl shadow-xl w-full h-[420px] bg-gray-100 overflow-hidden relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoom((z) => ({ ...z, x, y }));
                }}
                onMouseEnter={() => setZoom((z) => ({ ...z, active: true }))}
                onMouseLeave={() => setZoom({ active: false, x: 0, y: 0 })}
                style={activeImg ? {
                  backgroundImage: `url(${activeImg})`,
                  backgroundSize: zoom.active ? '200%' : 'cover',
                  backgroundPosition: zoom.active ? `${zoom.x}% ${zoom.y}%` : 'center',
                  backgroundRepeat: 'no-repeat',
                } : {}}
              >
                {!activeImg && <div className="w-full h-full" />}
              </div>
            </div>
          </div>
        </div>

        {/* Info + CTA */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
            <h1 className="text-3xl font-bold text-amber-900">{product.name}</h1>
            <p className="text-gray-600 mt-1">By {product.artisanName}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-3xl font-extrabold text-amber-700">₹{product.price}</span>
              <span className="text-sm text-gray-600">{product.category} • {product.region}</span>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  Add to Cart
                </button>

                <Link to="/artisan/ishwarya">
                  <button className="px-6 py-3 border-2 border-amber-600 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition">
                    Message Artisan
                  </button>
                </Link>

                <button
                  onClick={toggleWishlist}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${wishlisted ? "bg-gray-200 text-gray-800" : "border-2 border-amber-600 text-amber-700 hover:bg-amber-50"}`}
                >
                  {wishlisted ? "Saved" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
