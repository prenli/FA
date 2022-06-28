import { useGetPortfolioHoldingDetails } from "api/holdings/useGetPortfolioHoldingDetails";
import { useGetSecurityDetails } from "api/holdings/useGetSecurityDetails";
import { QueryLoadingWrapper } from "components";
import { useParams } from "react-router-dom";
import { HoldingDetails } from "views/holdingDetails/holdingDetails";
import { NotFoundView } from "views/notFoundView/notFoundView";

export const HoldingPage = () => {
  const { holdingId, portfolioId } = useParams();
  const {
    loading: securityLoading,
    error: securityError,
    data: securityData,
  } = useGetSecurityDetails(holdingId);
  const {
    loading: holdingLoading,
    error: holdingError,
    data: holdingData,
  } = useGetPortfolioHoldingDetails(portfolioId, holdingId);
  const mergedData = securityData && {
    holding: holdingData,
    security: securityData,
  };
  const isLoading = securityLoading || holdingLoading;
  const securityDoesNotExist = !isLoading && !securityData;

  return securityDoesNotExist ? (
    <NotFoundView />
  ) : (
    <QueryLoadingWrapper
      loading={isLoading}
      data={mergedData}
      error={securityError || holdingError}
      SuccessComponent={HoldingDetails}
    />
  );
};
