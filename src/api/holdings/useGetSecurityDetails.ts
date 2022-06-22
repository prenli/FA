import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { useGetContactInfo } from "../initial/useGetContactInfo";
import { SecurityDetailsQuery } from "./types";

const SECURITY_DETAILS_QUERY = gql`
  query GetSecurityDetails($securityId: Long, $currency: String) {
    security(id: $securityId) {
      id
      name
      securityCode
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
      fxRate(quoteCurrency: $currency)
    }
  }
`;

export const useGetSecurityDetails = (securityId: string | undefined) => {
  const { data: { portfoliosCurrency } = { portfoliosCurrency: "EUR" } } =
    useGetContactInfo();
  const { loading, error, data } = useQuery<SecurityDetailsQuery>(
    SECURITY_DETAILS_QUERY,
    {
      variables: {
        securityId: securityId,
        currency: portfoliosCurrency,
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
