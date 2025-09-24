import React, { useState } from "react";
import Header from "../components/Header";
import SmallMap from "../components/SmallMap"; // <-- Import SmallMap
import { useNavigate } from "react-router-dom";
import ProfileDrawer from "../components/ProfileDrawer";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null); // Track selected area
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userData = {
    name: "Sachin Kushwaha",
    phone: "9876543210",
    email: "abc@xyz.com",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100">
      {/* Header */}
      <Header
        location={location}
        setLocation={setLocation}
        onUserClick={() => setDrawerOpen(true)}
      />
      <ProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={userData}
      />

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-10 px-4">
        <button
          className="w-72 h-40 bg-white shadow-xl rounded-3xl text-4xl font-bold text-sky-700 hover:scale-105 hover:shadow-2xl transition transform"
          onClick={() => navigate("/bus")}
        >
          🚌 {t("Bus")}
        </button>
        <button
          className="w-72 h-40 bg-white shadow-xl rounded-3xl text-4xl font-bold text-emerald-700 hover:scale-105 hover:shadow-2xl transition transform"
          onClick={() => navigate("/truck")}
        >
          🚚 {t("Truck")}
        </button>
      </div>

      {/* Search Section */}
      <div className="mt-8 flex justify-center px-4">
        <div className="flex w-full max-w-xl shadow-md rounded-2xl overflow-hidden">
          <input
            id="searchbox"
            className="flex-1 px-5 py-3 text-lg outline-none border-none"
            placeholder={t("Enter destination or bus no./DIGIPIN")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            id="searchicon"
            className="bg-indigo-500 px-6 py-3 text-white font-semibold hover:bg-indigo-600 transition"
            onClick={() => {
              if (search.trim()) {
                navigate("/bus", { state: { query: search.trim() } });
              }
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Small Map Section */}
      <div className="flex flex-col items-center mt-10 px-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          {t("Select Area on Map")}
        </h2>
        <SmallMap onLocationSelect={(loc) => setSelectedArea(loc)} />
        {selectedArea && (
          <p className="mt-3 text-sm text-gray-600">
            📍 Selected Location: {selectedArea.lat.toFixed(4)}, {selectedArea.lng.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
}
