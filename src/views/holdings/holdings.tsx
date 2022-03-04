import { AllocationByType } from "api/holdings/types";
import { HoldingsGroupedByType } from "./components/HoldingsGroupedByType";
import { NoHoldings } from "./components/NoHoldings";

export interface HoldingsContainerProps {
  data: {
    allocationByType: AllocationByType[];
    currency: string;
  };
}

export const Holdings = ({
  data: { allocationByType, currency },
}: HoldingsContainerProps) => {
  if (allocationByType.length === 0) {
    return <NoHoldings />;
  }
  return (
    <div className="flex flex-col gap-4">
      {allocationByType.map((group) => (
        <HoldingsGroupedByType
          key={group.code}
          currency={currency}
          {...group}
        />
      ))}
    </div>
  );
};
