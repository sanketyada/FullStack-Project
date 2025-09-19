import React from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

export default function Wallet() {
  const { t } = useTranslation();

  return (
    <div>
      <Header location={{ name: t("Wallet") }} />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">{t("Wallet")}</h1>
        <p>{t("Your wallet details will show here.")}</p>
      </div>
    </div>
  );
}
