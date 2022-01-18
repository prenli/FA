import React from "react";
import { AllocationBySecurity } from "api/holdings/types";

type HoldingProps = AllocationBySecurity;
export const HoldingSummary = ({
  name,
  figures: { marketValue, amount, tradeAmount },
}: HoldingProps) => {
  return (
    <div className="py-2">
      <div className="flex justify-between">
        <div>{name}</div>
        <div className="font-semibold">{marketValue}</div>
      </div>
      <div className="flex justify-between">
        <div>{amount}</div>
        <div>{(marketValue - tradeAmount).toFixed(2)}</div>
      </div>
    </div>
  );
};
