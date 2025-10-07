import React from "react";
import { Link } from "react-router-dom";

import productImg from "../assets/images/demo.jpeg";
import artisanImg from "../assets/images/30.jpeg";

function ProductDetail() {
  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800">
      {/* Artisan Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="flex-shrink-0 md:w-1/2">
          <img
            src={artisanImg}
            alt="Ishwarya"
            className="rounded-3xl shadow-lg w-full h-[480px] object-cover"
          />
        </div>

        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-amber-800 mb-3">Ishwarya</h2>
          <p className="text-lg text-gray-600 font-medium mb-2">
            Handloom Artist • Tamil Nadu
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Meet <span className="font-semibold text-amber-700">Ishwarya</span>, a passionate
            handloom artist from Kanchipuram, Tamil Nadu. Her dedication to preserving
            the traditional Kanjivaram weaving technique has inspired many young artisans.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Each saree she weaves reflects her years of experience, patience, and love for
            craftsmanship. Ishwarya believes in connecting people through colors, textures,
            and stories woven into every piece of fabric.
          </p>
        </div>
      </section>

      {/* Product Section */}
      <section className="bg-white py-16 shadow-inner">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-amber-800 mb-8 text-center">
            Kanjivaram Saree — A Handwoven Masterpiece
          </h3>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <img
                src={productImg}
                alt="Kanjivaram Saree"
                className="rounded-3xl shadow-lg w-full h-[450px] object-cover"
              />
            </div>

            <div className="md:w-1/2">
              <p className="text-gray-700 leading-relaxed mb-6">
                Each <span className="font-semibold">Kanjivaram Saree</span> is meticulously
                handwoven using pure mulberry silk and genuine zari threads. Known for its
                rich color palette, lustrous texture, and durability, this saree is a
                celebration of South Indian heritage.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The intricate motifs and gold detailing tell stories of tradition passed down
                through generations — woven by Ishwarya’s skilled hands.
              </p>

              <p className="text-2xl font-bold text-amber-700 mb-4">Price: ₹8,500</p>

              <div className="flex space-x-4">
                <Link to="/artisan/ishwarya">
                  <button className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition">
                    Contact Artisan
                  </button>
                </Link>

                <button className="px-6 py-3 border-2 border-amber-600 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition">
                  Add to Wishlist
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
