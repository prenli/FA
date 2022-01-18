import React from "react";
import { AllocationByType } from "api/holdings/types";
import { HoldingsGroupedByType } from "./HoldingsGroupedByType/HoldingsGroupedByType";
import { NoHoldings } from "./NoHoldings/NoHoldings";

export interface HoldingsContainerProps {
  data: AllocationByType[];
}

export const Holdings = ({ data }: HoldingsContainerProps) => {
  if (data.length === 0) {
    return <NoHoldings />;
  }
  return (
    <div className="flex flex-col gap-4">
      {data.map((group) => (
        <HoldingsGroupedByType key={group.code} {...group} />
      ))}
    </div>
  );
};
