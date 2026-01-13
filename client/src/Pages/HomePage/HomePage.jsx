import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ================= HERO ================= */}
      <section className="px-6 py-24 text-center max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Discover Your <span className="text-teal-400">Perfect Trip</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Personalized travel recommendations based on your budget, mood,
          season, and travel style — powered by smart algorithms.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-700
                       font-semibold transition"
          >
            Get Recommendations
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl border border-gray-600
                       hover:bg-white/10 transition"
          >
            Login
          </button>
        </div>
      </section>
      {/* ================= PREFERENCES FORM ================= */}
      <section className="px-6 py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Tell Us About Your Trip
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              className="bg-slate-800 p-4 rounded-xl"
              value={preferences.category}
              onChange={(e) =>
                setPreferences({ ...preferences, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="beach">Beach</option>
              <option value="hill">Hill</option>
              <option value="heritage">Heritage</option>
            </select>

            <select
              className="bg-slate-800 p-4 rounded-xl"
              value={preferences.region}
              onChange={(e) =>
                setPreferences({ ...preferences, region: e.target.value })
              }
            >
              <option value="">Select Region</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="west">West</option>
              <option value="east">East</option>
            </select>

            <select
              className="bg-slate-800 p-4 rounded-xl"
              value={preferences.budget}
              onChange={(e) =>
                setPreferences({ ...preferences, budget: e.target.value })
              }
            >
              <option value="">Select Budget</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              className="bg-slate-800 p-4 rounded-xl"
              value={preferences.bestTime}
              onChange={(e) =>
                setPreferences({ ...preferences, bestTime: e.target.value })
              }
            >
              <option value="">Best Time</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="monsoon">Monsoon</option>
            </select>
          </div>

          <div className="mt-10 text-center">
            <button className="px-10 py-4 bg-teal-600 rounded-xl font-semibold">
              Get Recommendations
            </button>
          </div>
        </div>
      </section>
      {/* Recommendations Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Recommended For You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((place) => (
              <div key={place.name} className="bg-slate-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-400 mt-2">
                  {place.category} • {place.region}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= POPULAR DESTINATIONS ================= */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Popular Destinations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Bali", "Manali", "Paris"].map((place) => (
              <div
                key={place}
                className="bg-slate-900 rounded-xl overflow-hidden
                           hover:scale-105 transition"
              >
                <div className="h-48 bg-slate-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{place}</h3>
                  <p className="text-sm text-gray-400 mt-2">
                    Budget-friendly • Top rated • Seasonal
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= WHY US ================= */}
      <section className="px-6 py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Why Choose Our Recommender?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={item.title} className="bg-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-400 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= CTA ================= */}
      <footer className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Plan Your Next Trip?
        </h2>
        <button
          onClick={() => navigate("/register")}
          className="px-10 py-4 bg-teal-600 hover:bg-teal-700
                     rounded-xl font-semibold transition"
        >
          Start Now
        </button>
      </footer>
    </div>
  );
};

export default HomePage;
