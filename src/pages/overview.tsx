import React from "react";
import i18n from "i18n";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Overview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 items-start px-1">
      <h2 className="text-2xl font-semibold">{t("overviewPage.title")}</h2>
      <button
        onClick={() => i18n.changeLanguage("en")}
        className="py-2 px-4 text-white bg-green-800 rounded-lg pointer"
      >
        EN lang
      </button>
      <button
        onClick={() => i18n.changeLanguage("fi")}
        className="py-2 px-4 text-white bg-green-600 rounded-lg pointer"
      >
        FI lang
      </button>
      <button
        onClick={() => navigate("/portfolio/1")}
        className="py-2 px-4 text-white bg-blue-800 rounded-lg pointer"
      >
        {t("overviewPage.button")} #1
      </button>
    </div>
  );
};
