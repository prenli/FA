import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { SecurityDetailsQuery } from "./types";

const SECURITY_DETAILS_QUERY = gql`
  query GetSecurityDetails($securityId: Long) {
    security(id: $securityId) {
      id
      name
      isinCode
      url
      url2
      currency {
        securityCode
      }
      latestMarketData {
        id
        date: obsDate
        price: closeView
      }
      type {
        id
        code
        namesAsMap
      }
    }
  }
`;

export const useGetSecurityDetails = (securityId: string | undefined) => {
  const { loading, error, data } = useQuery<SecurityDetailsQuery>(
    SECURITY_DETAILS_QUERY,
    {
      variables: {
        securityId: securityId,
      },
      ...getFetchPolicyOptions(`useGetSecurityDetails.${securityId}`),
    }
  );

  return {
    loading,
    error,
    data: data?.security,
  };
};
