import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
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
  const { loading, error, data } = useQuery<SecurityDetailsQuery>(
    SECURITY_DETAILS_QUERY,
    {
      variables: {
        securityCode,
      },
      ...getFetchPolicyOptions(`useGetSecurityDetails.${securityCode}`),
    }
  );

  return {
    loading,
    error,
    data: data?.securities[0],
  };
};
