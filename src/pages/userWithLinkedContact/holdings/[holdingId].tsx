import { useGetAllPortfoliosHoldingDetails } from "api/holdings/useGetAllPortfoliosHoldingDetails";
import { useGetSecurityDetails } from "api/holdings/useGetSecurityDetails";
import { QueryLoadingWrapper } from "components";
import { useParams } from "react-router-dom";
import { HoldingDetails } from "views/holdingDetails/holdingDetails";
import { NotFoundView } from "views/notFoundView/notFoundView";

export const HoldingPage = () => {
  const { holdingId } = useParams();
  const {
    loading: securityLoading,
    error: securityError,
    data: securityData,
  } = useGetSecurityDetails(holdingId);
  const {
    loading: holdingLoading,
    error: holdingError,
    data: holdingData,
  } = useGetAllPortfoliosHoldingDetails(holdingId);
  // marge data are ready when:
  // 1) there are securityData (cached or fresh) and
  // 2) holdingData finishes loading or we have cached holdingData
  const mergedData =
    (!holdingLoading || holdingData) && securityData
      ? {
          holding: holdingData,
          security: securityData,
        }
      : undefined;
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
