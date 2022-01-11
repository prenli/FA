import React from "react";
import { AllPortfolios, DetailedPortfolio } from "api/types";
import { SecuritiesGroup } from "./SecuritiesGroup/SecuritiesGroup";
import { useGroupedSecuritiesByType } from "./useGroupedSecuritiesByType/useGroupedSecuritiesByType";

interface HoldingsProps {
  data: AllPortfolios | DetailedPortfolio;
}

export const Holdings = ({ data }: HoldingsProps) => {
  const groupedSecurities = useGroupedSecuritiesByType(
    data.portfolioReport.securityPositions
  );
  return (
    <div className="flex flex-col gap-3 ">
      {groupedSecurities.map((group) => (
        <SecuritiesGroup key={group.type} {...group} />
      ))}
    </div>
  );
};
