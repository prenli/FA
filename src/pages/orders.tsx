import React from "react";
import { useTranslation } from "react-i18next";

export const Orders = () => {
  const { t } = useTranslation();

  return <h2 className="text-2xl font-semibold">{t("ordersPage.title")}</h2>;
};
