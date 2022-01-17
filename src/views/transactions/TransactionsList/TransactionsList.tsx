import React from "react";
import { Transaction } from "../Transaction/Transaction";
import { TransactionsContainerProps } from "../TransactionsContainer/TransactionsContainer";
import { useSplitByMonth } from "./useSplitByMonth";

type TransactionsListProps = TransactionsContainerProps;
export const TransactionsList = ({ data }: TransactionsListProps) => {
  const splitData = useSplitByMonth(data);
  return (
    <div className="flex flex-col gap-6 min-h-[400px]">
      {splitData.map((group) => (
        <div key={group.label}>
          <div className="font-semibold capitalize border-b">{group.label}</div>
          <div className="flex flex-col gap-2">
            {group.transactions.map((transaction) => (
              <Transaction key={transaction.id} {...transaction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
