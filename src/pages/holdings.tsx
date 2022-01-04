import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Holdings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 items-start px-1">
      <h2 className="text-2xl font-semibold">{t("holdingsPage.title")}</h2>
      <button
        onClick={() => navigate("/holdings/1")}
        className="py-2 px-4 text-white bg-red-800 rounded-lg pointer"
      >
        {t("holdingsPage.button")} #1
      </button>
    </div>
  );
};
