import React from "react";
import { AllocationBySecurity } from "api/holdings/types";
import { useTranslation } from "react-i18next";

type HoldingProps = AllocationBySecurity;
export const HoldingSummary = ({
  name,
  figures: { marketValue, amount, tradeAmount },
}: HoldingProps) => {
  const { t } = useTranslation();
  return (
    <div className="py-2">
      <div className="flex justify-between">
        <div>{name}</div>
        <div className="font-semibold">
          {t("number", { value: marketValue })}
        </div>
      </div>
      <div className="flex justify-between">
        <div>{amount}</div>
        <div>{t("number", { value: marketValue - tradeAmount })}</div>
      </div>
    </div>
  );
};
