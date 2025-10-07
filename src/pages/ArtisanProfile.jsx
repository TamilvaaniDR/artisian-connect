import React from "react";
import artisanImg from "../assets/images/30.jpeg";
import craft1 from "../assets/images/I1.jpeg";
import craft2 from "../assets/images/I2.jpeg";
import craft3 from "../assets/images/I3.jpeg";

function ArtisanProfile() {
  const artisan = {
    name: "Ishwarya",
    location: "Kanchipuram, Tamil Nadu",
    skills: ["Handloom Weaving", "Silk Dyeing", "Designing Traditional Sarees"],
    story: `
      Ishwarya is a passionate handloom artist from Kanchipuram, Tamil Nadu.
      Coming from a long line of weavers, she blends age-old Kanjivaram weaving
      traditions with her modern artistic touch. Each saree is woven with care,
      taking days of work to complete — her dedication preserves India’s rich
      textile heritage and empowers women in her local community.
    `,
  };

  const crafts = [craft1, craft2, craft3];

  return (
    <div className="min-h-screen bg-[#fffaf3] text-gray-800">
      {/* ✅ Navbar is global now — handled in App.jsx */}

      {/* Artisan Section */}
      <section className="max-w-6xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center md:items-start gap-12 bg-gradient-to-r from-amber-50 to-white rounded-3xl shadow-sm">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={artisanImg}
            alt={artisan.name}
            className="w-[450px] h-[420px] object-cover rounded-3xl shadow-lg"
          />
        </div>

        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-amber-800 mb-3">
            {artisan.name}
          </h2>
          <p className="text-gray-600 mb-3">{artisan.location}</p>
          <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {artisan.story}
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-amber-700 mb-2">
              Skills:
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {artisan.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <button className="px-5 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition">
              Contact
            </button>
            <button className="px-5 py-3 border-2 border-amber-600 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition">
              Follow
            </button>
            <button className="px-5 py-3 border-2 border-amber-600 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition">
              Support
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-amber-800 mb-8 text-center">
          Craft Gallery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {crafts.map((craft, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-3"
            >
              <img
                src={craft}
                alt={`Craft ${index + 1}`}
                className="rounded-xl h-64 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtisanProfile;
