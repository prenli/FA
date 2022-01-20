import { gql, useQuery } from "@apollo/client";
import { SecurityDetailsQuery } from "./types";

const SECURITY_DETAILS_QUERY = gql`
  query GetSecurityDetails($securityCode: String) {
    securities(securityCode: $securityCode) {
      id
      name
      isinCode
      securityCode
      url
      url2
      currency {
        securityCode
      }
      latestMarketData {
        obsDate
        close
      }
      marketDataHistory(startDate: "") {
        price: close
        date: obsDate
      }
      type {
        code
        namesAsMap
      }
    }
  }
`;

export const useGetSecurityDetails = (securityCode: string | undefined) => {
  const { error, data } = useQuery<SecurityDetailsQuery>(
    SECURITY_DETAILS_QUERY,
    {
      variables: {
        securityCode: securityCode,
      },
      fetchPolicy: "cache-first",
    }
  );

  return {
    error,
    data: data?.securities[0],
  };
};
