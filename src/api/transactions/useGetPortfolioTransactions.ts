import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { useGlobalDateRange } from "hooks/useGlobalDateRange";
import { toShortISOString } from "utils/date";
import { TRANSACTION_FIELDS } from "./fragments";
import { PortfolioTransactionsQuery } from "./types";

const TRANSACTIONS_QUERY = gql`
  ${TRANSACTION_FIELDS}
  query GetPortfolioTransactions(
    $startDate: String
    $endDate: String
    $portfolioId: Long
  ) {
    portfolio(id: $portfolioId) {
      id
      transactions(startDate: $startDate, endDate: $endDate) {
        ...TransactionsFields
      }
    }
  }
`;

export const useGetPortfolioTransactions = (
  portfolioId: string | undefined,
  options?: QueryHookOptions
) => {
  const dateRangeProps = useGlobalDateRange();
  const { startDate, endDate } = dateRangeProps;

  const { loading, error, data } = useQuery<PortfolioTransactionsQuery>(
    TRANSACTIONS_QUERY,
    {
      variables: {
        startDate: toShortISOString(startDate),
        endDate: toShortISOString(endDate),
        portfolioId,
      },
      fetchPolicy: "cache-and-network",
      ...options,
    }
  );

  return {
    loading,
    error,
    data: data?.portfolio.transactions,
    ...dateRangeProps,
  };
};
