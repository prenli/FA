import React, { ReactNode } from "react";
import { Card } from "components";
import { useTranslation } from "react-i18next";

interface PortfolioValueCardProps {
  label: ReactNode;
  value: number;
  currency: string;
}

export const PortfolioValueCard = ({
  label,
  value,
  currency,
}: PortfolioValueCardProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <div className="flex justify-between p-2">
        <div>{label}</div>
        <div className="font-semibold">
          {t("numberWithCurrency", { value, currency })}
        </div>
      </div>
    </Card>
  );
};
