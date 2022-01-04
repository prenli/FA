import React from "react";
import { useTranslation } from "react-i18next";

export const Documents = () => {
  const { t } = useTranslation();
  return <h2 className="text-2xl font-semibold">{t("documentsPage.title")}</h2>;
};
