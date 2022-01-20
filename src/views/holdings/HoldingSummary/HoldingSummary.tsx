import React from "react";
import { AllocationBySecurity } from "api/holdings/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type HoldingProps = AllocationBySecurity;
export const HoldingSummary = ({
  name,
  code,
  figures: { marketValue, amount, tradeAmount },
}: HoldingProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="py-2" onClick={() => navigate(`holdings/${code}`)}>
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
