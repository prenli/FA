import React from "react";
import { Transaction } from "api/transactions/types";
import { NoTransactions } from "./NoTransactions";
import { TransactionsList } from "./TransactionsList";

export interface TransactionsContainerProps {
  data: Transaction[];
}

export const TransactionsContainer = ({ data }: TransactionsContainerProps) => {
  if (data.length === 0) {
    return <NoTransactions />;
  }
  return <TransactionsList data={data} />;
};
