import React from "react";
import { useTranslation } from "react-i18next";

interface SecurityProps {
  marketTradeAmount: number;
  valueChangeAbsolute: number;
  security: {
    name: string;
    latestMarketData: {
      latestPrice: number;
    };
  };
}

export const SecurityPosition = ({
  security,
  marketTradeAmount,
  valueChangeAbsolute,
}: SecurityProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="text-lg">{security.name}</div>
      <div className="flex justify-between">
        <SecurityPositionValue
          value={security.latestMarketData.latestPrice}
          label={t("holdingsPage.latestMarketPrice")}
        />
        <SecurityPositionValue
          value={valueChangeAbsolute}
          label={t("holdingsPage.unrealizedProfits")}
        />
        <SecurityPositionValue
          value={marketTradeAmount}
          label={t("holdingsPage.marketValue")}
        />
      </div>
    </div>
  );
};

interface SecurityPositionValueProps {
  value: number;
  label: string;
}

const SecurityPositionValue = ({
  value,
  label,
}: SecurityPositionValueProps) => (
  <div>
    <div className="text-sm font-medium">{label}</div>
    <div className="text-center">{value}</div>
  </div>
);
