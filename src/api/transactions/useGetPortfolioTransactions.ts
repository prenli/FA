import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { toShortISOString, startOfMonth } from "utils/date";
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
  const [startDate, setStartDate] = useState<Date>(initialRange.start);
  const [endDate, setEndDate] = useState<Date>(initialRange.end);

  useEffect(() => {
    initialRange.start = startDate;
    initialRange.end = endDate;
  }, [startDate, endDate]);

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
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};
