import React from "react";
import { AllocationByType } from "api/holdings/types";
import { Card } from "components";
import { HoldingSummary } from "../HoldingSummary/HoldingSummary";

type HoldingsGroupedByTypeProps = AllocationByType;

export const HoldingsGroupedByType = ({
  name,
  figures: { marketValue },
  allocationBySecurity,
}: HoldingsGroupedByTypeProps) => {
  return (
    <Card>
      <div className="p-2 divider">
        <div className="flex justify-between pb-2 font-semibold border-b">
          <div>{name}</div>
          <div>{marketValue}</div>
        </div>
        <div className="flex flex-col divide-y">
          {allocationBySecurity.map((security) => (
            <HoldingSummary key={security.code} {...security} />
          ))}
        </div>
      </div>
    </Card>
  );
};
