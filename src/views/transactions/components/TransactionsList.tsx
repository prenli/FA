import { TransactionsContainerProps } from "./TransactionsContainer";
import { TransactionsGroup } from "./TransactionsGroup";
import { useSplitByMonth } from "./useSplitByMonth";

type TransactionsListProps = TransactionsContainerProps;
export const TransactionsList = ({ data }: TransactionsListProps) => {
  const splitData = useSplitByMonth(data);

  return (
    <>
      {splitData.map((group) => (
        <TransactionsGroup
          key={group.label}
          transactions={group.transactions}
          label={group.label}
          type="transaction"
        />
      ))}
    </>
  );
};
