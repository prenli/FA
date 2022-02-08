import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { toShortISOString, startOfMonth } from "utils/date";
import { useDateRange } from "../useDateRange";
import { TRANSACTION_FIELDS } from "./fragments";
import { PortfolioTransactionsQuery } from "./types";

const TRANSACTIONS_QUERY = gql`
  ${TRANSACTION_FIELDS}
  query GetTransactions(
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

const now = new Date();
const initialRange = {
  start: startOfMonth(now),
  end: now,
};

export const useGetPortfolioTransactions = (
  portfolioId: string | undefined
) => {
  const dateRangeProps = useDateRange(initialRange);
  const { startDate, endDate } = dateRangeProps;

  const { loading, error, data } = useQuery<PortfolioTransactionsQuery>(
    TRANSACTIONS_QUERY,
    {
      variables: {
        startDate: toShortISOString(startDate),
        endDate: toShortISOString(endDate),
        portfolioId,
      },
      ...getFetchPolicyOptions(
        `useGetPortfolioTransactions.${portfolioId}.${startDate}.${endDate}`
      ),
    }
  );

  return {
    loading,
    error,
    data: data?.portfolio.transactions,
    ...dateRangeProps,
  };
};
