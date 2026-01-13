import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Globe, Wallet, CloudSun, Search } from "lucide-react";
import { Heart } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    category: "",
    region: "",
    budget: "",
    bestTime: "",
  });

  const recommendations = [
    {
      name: "Manali",
      category: "Hill Station",
      region: "Himachal Pradesh",
    },
    {
      name: "Goa",
      category: "Beach Destination",
      region: "Western India",
    },
    {
      name: "Jaipur",
      category: "Heritage City",
      region: "Rajasthan",
    },
    {
      name: "Munnar",
      category: "Nature Retreat",
      region: "Kerala",
    },
    {
      name: "Rishikesh",
      category: "Spiritual & Adventure",
      region: "Uttarakhand",
    },
    {
      name: "Darjeeling",
      category: "Hill Station",
      region: "West Bengal",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 text-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80"
            alt="Travel background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/30 to-[#020617]/70" />
        </div>
        {/* Top-right Auth Actions */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full text-sm font-medium
               text-white border border-white/30
               hover:bg-white/10 transition backdrop-blur-md"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-full text-sm font-bold
               bg-white text-black
               hover:bg-gray-200 transition"
          >
            Sign up
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div
            className="inline-block px-4 py-1 mb-6 rounded-full
                    border border-white/20 bg-black/30 backdrop-blur-md
                    text-xs font-medium tracking-widest text-gray-200"
          >
            AI-POWERED TRAVEL
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Smart & Simple <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Trip Planning
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12">
            Personalized travel recommendations based on your budget, mood,
            season, and travel style.
          </p>

          {/* ================= PREFERENCES FORM (HERO EMBEDDED) ================= */}
          {/* ================= GLASS PREFERENCES BAR ================= */}
          <div
            className="w-full max-w-5xl mx-auto mt-10
                glass-panel rounded-3xl p-4
                shadow-2xl shadow-black/40"
          >
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Category */}
              <div
                className="flex items-center gap-3 px-4 h-14 w-full
                    bg-white/5 rounded-2xl border border-white/10
                    hover:bg-white/10 transition"
              >
                <MapPin size={18} className="text-gray-400" />
                <select
                  value={preferences.category}
                  onChange={(e) =>
                    setPreferences({ ...preferences, category: e.target.value })
                  }
                  className="bg-transparent border-none outline-none
                   text-white w-full"
                >
                  <option value="">Category</option>
                  <option value="beach" className="text-black">
                    Beach
                  </option>
                  <option value="hill" className="text-black">
                    Hill
                  </option>
                  <option value="heritage" className="text-black">
                    Heritage
                  </option>
                </select>
              </div>

              {/* Region */}
              <div
                className="flex items-center gap-3 px-4 h-14 w-full
                    bg-white/5 rounded-2xl border border-white/10
                    hover:bg-white/10 transition"
              >
                <Globe size={18} className="text-gray-400" />
                <select
                  value={preferences.region}
                  onChange={(e) =>
                    setPreferences({ ...preferences, region: e.target.value })
                  }
                  className="bg-transparent border-none outline-none
                   text-white w-full"
                >
                  <option value="">Region</option>
                  <option value="north" className="text-black">
                    North
                  </option>
                  <option value="south" className="text-black">
                    South
                  </option>
                  <option value="east" className="text-black">
                    East
                  </option>
                  <option value="west" className="text-black">
                    West
                  </option>
                </select>
              </div>

              {/* Budget */}
              <div
                className="flex items-center gap-3 px-4 h-14 w-full
                    bg-white/5 rounded-2xl border border-white/10
                    hover:bg-white/10 transition"
              >
                <Wallet size={18} className="text-gray-400" />
                <select
                  value={preferences.budget}
                  onChange={(e) =>
                    setPreferences({ ...preferences, budget: e.target.value })
                  }
                  className="bg-transparent border-none outline-none
                   text-white w-full"
                >
                  <option value="">Budget</option>
                  <option value="low" className="text-black">
                    Low
                  </option>
                  <option value="medium" className="text-black">
                    Medium
                  </option>
                  <option value="high" className="text-black">
                    High
                  </option>
                </select>
              </div>

              {/* Best Time */}
              <div
                className="flex items-center gap-3 px-4 h-14 w-full
                    bg-white/5 rounded-2xl border border-white/10
                    hover:bg-white/10 transition"
              >
                <CloudSun size={18} className="text-gray-400" />
                <select
                  value={preferences.bestTime}
                  onChange={(e) =>
                    setPreferences({ ...preferences, bestTime: e.target.value })
                  }
                  className="bg-transparent border-none outline-none
                   text-white w-full"
                >
                  <option value="">Season</option>
                  <option value="summer" className="text-black">
                    Summer
                  </option>
                  <option value="winter" className="text-black">
                    Winter
                  </option>
                  <option value="monsoon" className="text-black">
                    Monsoon
                  </option>
                </select>
              </div>

              {/* Search Button */}
              <button
                className="h-14 px-8 bg-white text-black rounded-2xl
             font-bold hover:bg-gray-200 transition
             flex items-center gap-3 justify-center whitespace-nowrap"
              >
                <Search size={18} />
                <span>Get Trips</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Recommendations Section */}
      <section className="relative px-6 py-28">
        {/* subtle background fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center tracking-tight">
            Recommended For You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recommendations.map((place) => (
              <div
                key={place.name}
                className="glass-panel rounded-2xl p-6
                     hover:scale-[1.04] hover:bg-white/15
                     transition-all duration-300 cursor-pointer"
              >
                {/* Card Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {place.name}
                  </h3>

                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    {place.category} • {place.region}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR DESTINATIONS ================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Popular Destinations
          </h2>

          {/* Categories (static for now) */}
          <div className="flex flex-wrap gap-3">
            {["All Tours", "Forest", "City", "Nature", "Ocean"].map(
              (cat, i) => (
                <button
                  key={i}
                  className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors ${
                    i === 0
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Misty Mountains",
              location: "Manali, India",
              price: "Rs 8500",
              img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Urban Adventure",
              location: "Jaipur, India",
              price: "Rs 1,2000",
              img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyfGVufDB8fDB8fHwy",
            },
            {
              title: "Northern Escapes",
              location: "Ladakh, India",
              price: "Rs 2,1000",
              img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Heart icon */}
              <div className="absolute top-4 right-4 glass-panel p-2 rounded-full cursor-pointer hover:bg-white/20 transition">
                <Heart size={20} className="text-white" />
              </div>

              {/* Bottom info */}
              <div
                className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl
                        flex justify-between items-center bg-black/40 backdrop-blur-xl"
              >
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-xs text-gray-800">{item.location}</p>
                </div>
                <div className="bg-white text-black px-3 py-1 rounded-lg text-sm font-bold">
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ================= WHY US ================= */}
      <section className="relative px-6 py-28">
        {/* subtle background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight">
            Why Choose Our Recommender?
          </h2>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Personalized",
                desc: "Recommendations tailored to your preferences.",
              },
              {
                title: "Smart Filtering",
                desc: "No generic lists. Context-aware suggestions.",
              },
              {
                title: "Time & Budget Aware",
                desc: "Travel smarter, not harder.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-panel rounded-2xl p-8
                     hover:bg-white/15 hover:scale-[1.03]
                     transition-all duration-300"
              >
                {/* Title */}
                <h3 className="text-xl font-semibold tracking-tight mb-4">
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="mx-auto h-px w-12 bg-white/20 mb-4" />

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <footer className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background image + gradient */}
        <div className="absolute top-0 left-0 right-0 h-[420px] z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
            alt="Travel background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-black/30 to-[#020617]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* CTA */}
          <div className="text-center mb-32">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to Plan Your <br /> Next Trip?
            </h2>

            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Let TripWise help you discover destinations perfectly matched to
              your budget, season, and travel style.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="bg-white text-black px-10 py-4 rounded-full
                   font-bold text-lg hover:bg-gray-200
                   transition shadow-2xl"
            >
              Start Now
            </button>
          </div>

          {/* Footer links */}
          <div className="grid md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-7 h-7 bg-white rounded-full
                          flex items-center justify-center
                          text-black font-bold text-sm"
                >
                  T
                </div>
                <span className="font-bold text-lg">TripWise</span>
              </div>

              <p className="text-sm text-gray-500">
                © 2026 TripWise.
                <br />
                All rights reserved.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">
                  Recommendations
                </li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                {["T", "I", "F"].map((icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full glass-panel
                         flex items-center justify-center
                         cursor-pointer hover:bg-white/20 transition"
                  >
                    <span className="text-sm font-bold">{icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
