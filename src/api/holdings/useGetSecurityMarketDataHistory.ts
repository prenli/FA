import { gql, useQuery } from "@apollo/client";
import { SecurityMarketDataHistoryQuery } from "./types";

const SECURITY_DETAILS_QUERY = gql`
  query GetSecurityMarketDataHistory(
    $securityCode: String
    $timePeriodCode: String
  ) {
    securities(securityCode: $securityCode) {
      id
      marketDataHistory(timePeriodCode: $timePeriodCode) {
        id
        price: closeView
        date: obsDate
      }
    }
  }
`;

export const useGetSecurityMarketDataHistory = (
  securityCode: string | undefined,
  timePeriodCode: string
) => {
  const { loading, error, data } = useQuery<SecurityMarketDataHistoryQuery>(
    SECURITY_DETAILS_QUERY,
    {
      variables: {
        securityCode,
        timePeriodCode,
      },
      fetchPolicy: "cache-first",
    }
  );

  return {
    loading,
    error,
    data: data?.securities[0],
  };
};
