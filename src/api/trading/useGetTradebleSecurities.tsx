import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "../utils";

const TRADABLE_SECURITIES_QUERY = gql`
  query GetTradableSecurities {
    securities(tags: "Tradeable") {
      id
      name
      isinCode
      url
      url2
      country {
        id
        name
        code
      }
      currency {
        id
        securityCode
      }
    }
  }
`;

export interface TradableSecurity {
  id: number;
  name: string;
  isinCode: string;
  url: string;
  url2: string;
  currency: {
    securityCode: string;
  };
  country?: {
    code: string;
  };
}

export interface TradableSecuritiesQuery {
  securities: TradableSecurity[];
}

export const useGetTradebleSecurities = () => {
  const { loading, error, data } = useQuery<TradableSecuritiesQuery>(
    TRADABLE_SECURITIES_QUERY,
    getFetchPolicyOptions("useGetTradebleSecurities")
  );

  return { loading, error, data: data?.securities };
};
