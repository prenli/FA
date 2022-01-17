import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { startOfMonth } from "date-fns";
import { TRANSACTIONS_FIELDS } from "./fragments";
import { PortfolioTransactionsQuery } from "./types";

const TRANSACTIONS_QUERY = gql`
  ${TRANSACTIONS_FIELDS}
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

export const useGetPortfolioTransactions = (
  portfolioId: string | undefined
) => {
  const now = new Date();
  const [startDate, setStartDate] = useState<Date>(startOfMonth(now));
  const [endDate, setEndDate] = useState<Date>(now);
  const { error, data } = useQuery<PortfolioTransactionsQuery>(
    TRANSACTIONS_QUERY,
    {
      variables: {
        startDate,
        endDate,
        portfolioId: portfolioId,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    error,
    data: data?.portfolio.transactions,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};
