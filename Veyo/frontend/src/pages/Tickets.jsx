import React, { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

export default function Tickets() {
  const { t } = useTranslation();

  // Dummy ticket history data
  const ticketHistory = [
    { id: 1, from: "Mumbai", to: "Pune", date: "2025-09-20", status: "Confirmed" },
    { id: 2, from: "Delhi", to: "Chandigarh", date: "2025-09-15", status: "Cancelled" },
    { id: 3, from: "Bangalore", to: "Mysore", date: "2025-09-05", status: "Completed" },
  ];

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header location={{ name: t("Location") }} />
      
      <div className="p-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {t("My Tickets")}
        </h1>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
            {t("Book a Ticket")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder={t("From")}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              placeholder={t("To")}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          <button
            onClick={() => alert(`Searching tickets from ${from} to ${to} on ${date}`)}
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            {t("Search")}
          </button>
        </div>

        {/* Ticket History */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
            {t("Ticket History")}
          </h2>
          {ticketHistory.length > 0 ? (
            <ul className="space-y-3">
              {ticketHistory.map((ticket) => (
                <li
                  key={ticket.id}
                  className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      {ticket.from} ➝ {ticket.to}
                    </p>
                    <p className="text-sm text-gray-500">{ticket.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      ticket.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              {t("No tickets found.")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
