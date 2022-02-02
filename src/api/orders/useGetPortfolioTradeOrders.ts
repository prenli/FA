import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { TRADE_ORDERS_DETAILS } from "./fragments";
import { PortfolioTradeOrdersQuery } from "./types";

const PORTFOLIO_TRADE_ORDERS_QUERY = gql`
  ${TRADE_ORDERS_DETAILS}
  query GetPortfolio($portfolioId: Long) {
    portfolio(id: $portfolioId) {
      id
      tradeOrders {
        ...TradeOrdersDetails
      }
    }
  }
`;

export const useGetPortfolioTradeOrders = (portfolioId: string | undefined) => {
  const { loading, error, data } = useQuery<PortfolioTradeOrdersQuery>(
    PORTFOLIO_TRADE_ORDERS_QUERY,
    {
      variables: {
        portfolioId,
      },
      ...getFetchPolicyOptions(`useGetPortfolioTradeOrders.${portfolioId}`),
    }
  );

  return { loading, error, data: data?.portfolio.tradeOrders };
};
