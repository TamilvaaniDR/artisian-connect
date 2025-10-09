import React from "react";
import { Link, useNavigate } from "react-router-dom";

import img1 from "../assets/images/10.jpeg";
import img2 from "../assets/images/20.jpeg";
import img3 from "../assets/images/30.jpeg";
import img4 from "../assets/images/50.jpeg";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6 bg-gradient-to-b from-amber-50 to-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-800">
          Connecting India’s Heart — One Craft at a Time
        </h2>
        <p className="max-w-2xl text-lg text-gray-600 mb-8">
          Discover authentic handmade treasures from India’s talented artisans.
          Explore crafts that carry stories, colors, and culture from every
          corner of India.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
          className="w-full max-w-md flex items-center border border-amber-400 rounded-full overflow-hidden bg-white shadow-md"
        >
          <input
            type="text"
            placeholder="Search Artisan, Product or Region..."
            className="flex-grow px-4 py-2 outline-none"
          />
          <button type="submit" className="bg-amber-600 text-white px-6 py-2 font-semibold hover:bg-amber-700">
            Search
          </button>
        </form>

        {/* CTAs */}
        <div className="mt-6 flex gap-4">
          <Link to="/login">
            <button className="px-6 py-2 rounded-lg text-white font-semibold bg-amber-600 hover:bg-amber-700">
              Explore Crafts
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-2 rounded-lg border-2 border-amber-600 text-amber-700 font-semibold hover:bg-amber-50">
              View a Sample Craft
            </button>
          </Link>
        </div>
      </section>

      {/* Popular Artisans Section */}
      <section className="px-10 py-16">
        <h3 className="text-3xl font-bold text-amber-800 mb-8 text-center">
          Popular Artisans & Crafts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            { img: img1, name: "Asha Devi", role: "Basket Weaver • Odisha" },
            { img: img2, name: "Raj Singh", role: "Wool Weaver • Punjab" },
            { img: img3, name: "Ishwarya", role: "Handloom Artist • Tamil Nadu" },
            { img: img4, name: "Lakshmi Iyer", role: "Potter • Uttar Pradesh" },
          ].map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4"
            >
              <img
                src={a.img}
                alt={a.name}
                className="rounded-xl h-48 w-full object-cover"
              />
              <h4 className="text-xl font-semibold mt-4 text-amber-700">
                {a.name}
              </h4>
              <p className="text-gray-600">{a.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
