import { Card } from "components";
import { Transaction } from "./Transaction";
import { TransactionsContainerProps } from "./TransactionsContainer";
import { useSplitByMonth } from "./useSplitByMonth";

type TransactionsListProps = TransactionsContainerProps;
export const TransactionsList = ({ data }: TransactionsListProps) => {
  const splitData = useSplitByMonth(data);
  return (
    <div className="flex flex-col gap-4 min-h-[400px]">
      {splitData.map((group) => (
        <Card key={group.label} header={group.label}>
          <div className="flex flex-col px-2 divide-y">
            {group.transactions.map((transaction) => (
              <Transaction key={transaction.id} {...transaction} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
