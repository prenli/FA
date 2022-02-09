import React from "react";
import { useTranslation } from "react-i18next";

interface HoldingHeaderProps {
  currency: string;
  marketValue: number;
}

export const HoldingHeader = ({
  currency,
  marketValue,
}: HoldingHeaderProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center">
      <div>{t("holdingsPage.holding")}</div>
      <div className="text-lg font-bold text-right">
        {t("numberWithCurrency", {
          value: marketValue,
          currency,
        })}
      </div>
    </div>
  );
};
