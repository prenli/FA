import React from "react";
import { useGetPortfolioTransactions } from "api/useGetPortfolioTransactions";
import { useParams } from "react-router-dom";
import { Transactions } from "views/transactions/transactions";

export const TransactionsPage = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolioTransactions(portfolioId);

  return <Transactions {...queryData} />;
};
