import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Header({ location, setLocation, onUserClick }) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For navbar options
  const { t } = useTranslation();
  const navigate = useNavigate();

  const locations = [t("Punjab"), t("Maharashtra"), t("Delhi"), t("Karnataka")];

  const menuOptions = [
    { label: t("Book a Card"), path: "/book" },
    { label: t("Your Tickets"), path: "/tickets" },
    { label: t("Logout"), path: "/logout" },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-lg flex justify-between items-center px-6 py-4 shadow-lg">
        {/* Left Side: Logo + User Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onUserClick}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            title={t("Show User Info")}
          >
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </button>
          <span className="font-serif font-extrabold text-white text-3xl tracking-wide select-none">
            Vayo
          </span>
        </div>

        {/* Center: Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {menuOptions.map((item) => (
            <button
              key={item.label}
              className="text-white font-medium hover:text-indigo-300 transition-colors"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Location & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            className="border border-indigo-300 px-5 py-2.5 rounded-xl bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 hover:shadow-md transition-all duration-200"
            onClick={() => setShowLocationModal(true)}
            title={t("Change Location")}
          >
            {location ? `📍 ${location.name}` : `${t("Location")} >`}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Navbar */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg w-full absolute top-16 left-0 z-40 flex flex-col items-center py-4 gap-3 shadow-lg">
          {menuOptions.map((item) => (
            <button
              key={item.label}
              className="w-11/12 py-2 text-white text-center rounded-lg hover:bg-indigo-700 transition-all"
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl animate-fadeIn">
            <h3 className="text-indigo-700 text-xl font-bold mb-4 text-center">
              {t("Select Location")}
            </h3>
            <div className="space-y-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  className="w-full py-2.5 px-4 text-left rounded-lg font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                  onClick={() => {
                    setLocation({ name: loc });
                    setShowLocationModal(false);
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
            <button
              className="mt-5 w-full py-2 text-center rounded-lg text-red-600 hover:bg-red-50 font-semibold transition-all"
              onClick={() => setShowLocationModal(false)}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
