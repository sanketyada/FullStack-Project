import React from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div>
      <Header location={{ name: t("About") }} />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">{t("About")}</h1>
        <p>{t("This app helps manage tickets, buses, and trucks efficiently.")}</p>
      </div>
    </div>
  );
}
