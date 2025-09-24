import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faTicket,
  faBus,
  faTruckFast,
  faGlobe,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ProfileDrawer({ open, onClose, user }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const navigateAndClose = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed left-0 z-[100] transition-opacity`}
        style={{
          top: 72,
          bottom: 64,
          right: 0,
          background: open ? "rgba(0,0,0,0.25)" : "transparent",
          backdropFilter: open ? "blur(4px)" : undefined,
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transition: "opacity 0.3s",
        }}
        onClick={onClose}
      />
      <aside
        className="fixed left-0 z-[110] max-w-full bg-black bg-opacity-35 backdrop-blur-md shadow-2xl transition-transform duration-300"
        style={{
          width: 298,
          top: 72,
          bottom: 64,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center mb-8">
            <div>
              <div className="text-lg font-bold text-white">{user?.name || "User Name"}</div>
              <div className="text-sm text-indigo-200">{user?.phone}</div>
            </div>
            <button
              className="ml-auto text-indigo-200 font-bold text-lg hover:text-white transition"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          <div className="space-y-3 flex-1">
            <button className="drawer-item" onClick={() => navigateAndClose("/wallet")}>
              <FontAwesomeIcon icon={faWallet} className="mr-4" />
              {t("Wallet")}
            </button>
            <button className="drawer-item" onClick={() => navigateAndClose("/tickets")}>
              <FontAwesomeIcon icon={faTicket} className="mr-4" />
              {t("Tickets")}
            </button>
            <button className="drawer-item" onClick={() => navigateAndClose("/bus")}>
              <FontAwesomeIcon icon={faBus} className="mr-4" />
              {t("Bus")}
            </button>
            <button className="drawer-item" onClick={() => navigateAndClose("/truck")}>
              <FontAwesomeIcon icon={faTruckFast} className="mr-4" />
              {t("Truck")}
            </button>
            <div className="drawer-item">
              <FontAwesomeIcon icon={faGlobe} className="mr-4" />
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="bg-transparent text-indigo-100 w-full cursor-pointer"
              >
                <option value="en">{t("English")}</option>
                <option value="hi">{t("Hindi")}</option>
                <option value="pa">{t("Punjabi")}</option>
              </select>
            </div>
            <button className="drawer-item" onClick={() => navigateAndClose("/about")}>
              <FontAwesomeIcon icon={faInfoCircle} className="mr-4" />
              {t("About")}
            </button>
          </div>
        </div>
      </aside>
      <style jsx>{`
        .drawer-item {
          width: 100%;
          background: transparent;
          border: none;
          color: #c3daf7;
          padding: 0.5rem 1rem;
          text-align: left;
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .drawer-item:hover {
          background-color: rgba(67, 56, 202, 0.1);
          color: #637ccc;
        }
      `}</style>
    </>
  );
}
