import React from "react";
import { useTranslation } from "react-i18next";

interface TransactionValueProps {
  value: number;
  currency: string;
}

export const TransactionValue = ({
  value,
  currency,
}: TransactionValueProps) => {
  const { t } = useTranslation();
  return (
    <div className="font-medium">{`${value > 0 ? "+" : ""}${t(
      "numberWithCurrency",
      { value, currency }
    )}`}</div>
  );
};
