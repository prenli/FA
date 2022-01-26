import React, { ReactNode } from "react";
import { Card } from "components";
import { useTranslation } from "react-i18next";

interface LatestMarketPriceProps {
  label: ReactNode;
  value: number;
  currency: string;
}

export const LatestMarketPrice = ({
  label,
  value,
  currency,
}: LatestMarketPriceProps) => {
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
