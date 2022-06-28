import { TradeOrder } from "api/orders/types";
import { Transaction } from "api/transactions/types";
import { Card } from "components";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { LocalOrder } from "hooks/useTradingStorage";
import { TransactionType } from "../../transactionDetails/transactionDetailsView";
import { TransactionsListWithOneLineRow } from "./TransactionsListWithOneLineRow";
import { TransactionsListWithTwoLinesRow } from "./TransactionsListWithTwoLinesRow";

export interface TransactionsListProps {
  transactions: (TradeOrder | LocalOrder)[] | Transaction[];
  type: TransactionType;
}

export type TransactionProps = (TradeOrder | Transaction) & {
  onClick: () => void;
  showPortfolioLabel?: boolean;
};

interface TransactionsGroupProps {
  label: string;
  transactions: (TradeOrder | LocalOrder)[] | Transaction[];
  type: TransactionType;
}

export const TransactionsGroup = ({
  label,
  transactions,
  type,
}: TransactionsGroupProps) => {
  const hasOneLineRow = useMatchesBreakpoint("md");

  const TransactionsList = hasOneLineRow
    ? TransactionsListWithOneLineRow
    : TransactionsListWithTwoLinesRow;

  return (
    <Card key={label} header={label}>
      <TransactionsList transactions={transactions} type={type} />
    </Card>
  );
};
