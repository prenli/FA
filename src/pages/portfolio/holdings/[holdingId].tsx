import React from "react";
import { useGetPortfolioHoldingDetails } from "api/holdings/useGetPortfolioHoldingDetails";
import { useGetSecurityDetails } from "api/holdings/useGetSecurityDetails";
import { QueryLoadingWrapper } from "components";
import { useParams } from "react-router-dom";
import { HoldingDetails } from "views/holdingDetails/holdingDetails";

export const HoldingPage = () => {
  const { holdingId, portfolioId } = useParams();
  const { error: securityError, data: securityData } =
    useGetSecurityDetails(holdingId);
  const { error: holdingError, data: holdingData } =
    useGetPortfolioHoldingDetails(portfolioId, holdingId);
  const mergedData = securityData &&
    holdingData && {
      ...holdingData,
      security: securityData,
    };

  return (
    <QueryLoadingWrapper
      data={mergedData}
      error={securityError || holdingError}
      SuccessComponent={HoldingDetails}
    />
  );
};