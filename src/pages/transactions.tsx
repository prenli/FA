import React from "react";
import { useGetAllPortfoliosTransactions } from "api/useGetAllPortfoliosTransactions";
import { Transactions } from "views/transactions/transactions";

export const TransactionsPage = () => {
  const queryData = useGetAllPortfoliosTransactions();

  return <Transactions {...queryData} />;
};
