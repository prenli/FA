import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { startOfMonth, toShortISOString } from "utils/date";
import { useDateRange } from "../useDateRange";
import { TRADE_ORDERS_DETAILS } from "./fragments";
import { PortfolioTradeOrdersQuery } from "./types";

const PORTFOLIO_TRADE_ORDERS_QUERY = gql`
  ${TRADE_ORDERS_DETAILS}
  query GetPortfolio($portfolioId: Long, $startDate: String, $endDate: String) {
    portfolio(id: $portfolioId) {
      id
      tradeOrders(
        transactionStartDate: $startDate
        transactionEndDate: $endDate
      ) {
        ...TradeOrdersDetails
      }
    }
  }
`;

const now = new Date();
const initialRange = {
  start: startOfMonth(now),
  end: now,
};

export const useGetPortfolioTradeOrders = (portfolioId: string | undefined) => {
  const dateRangeProps = useDateRange(initialRange);
  const { startDate, endDate } = dateRangeProps;

  const { loading, error, data } = useQuery<PortfolioTradeOrdersQuery>(
    PORTFOLIO_TRADE_ORDERS_QUERY,
    {
      variables: {
        startDate: toShortISOString(startDate),
        endDate: toShortISOString(endDate),
        portfolioId,
      },
      ...getFetchPolicyOptions(
        `useGetPortfolioTradeOrders.${portfolioId}.${startDate}.${endDate}`
      ),
    }
  );

  return {
    loading,
    error,
    data: data?.portfolio.tradeOrders,
    ...dateRangeProps,
  };
};
