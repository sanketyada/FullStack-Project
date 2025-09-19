import React from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import MapView from "../components/MapView/MapView";

export default function Truck() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header location={{ name: t("Punjab") }} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-12 shadow-md">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3 tracking-wide">
            {t("Truck & Lorries Section")}
          </h1>
          <p className="text-lg opacity-90">
            {t("Show truck routes, live locations, bookings, and analytics in real-time.")}
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-6 py-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* Optional title bar for the map */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {t("Live Truck Tracking")}
              </h2>
              <span className="text-sm text-gray-500">
                {t("Updated every few seconds")}
              </span>
            </div>

            {/* MapView Full Height */}
            <div className="h-[75vh]">
              <MapView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
