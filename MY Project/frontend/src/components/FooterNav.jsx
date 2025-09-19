import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTruckFast, faBus, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

export default function FooterNav() {
  const { t } = useTranslation();

  const navs = [
    { icon: faHouse, label: t("Home"), to: "/" },
    { icon: faBus, label: t("Bus"), to: "/bus" },
    { icon: faTruckFast, label: t("Truck"), to: "/truck" },
    { icon: faTicket, label: t("Tickets"), to: "/tickets" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-md shadow-lg text-indigo-100 z-50">
      <div className="grid grid-cols-4 divide-x divide-indigo-400">
        {navs.map(({ icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              "flex flex-col items-center justify-center h-16 transition select-none " +
              (isActive ? "bg-black bg-opacity-70 text-white font-bold" : "text-indigo-300")
            }
            title={label}
          >
            <FontAwesomeIcon icon={icon} className="text-2xl mb-1" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
