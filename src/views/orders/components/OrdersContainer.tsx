import { TradeOrder } from "api/orders/types";
import { TransactionsGroup } from "../../transactions/components/TransactionsGroup";
import { NoOrders } from "./NoOrders";
import { useGroupedTradeOrdersByStatus } from "./useGroupedTradeOrdersByStatus";

interface OrdersContainerProps {
  data: TradeOrder[];
}

export const OrdersContainer = ({ data }: OrdersContainerProps) => {
  const groupedTradeOrders = useGroupedTradeOrdersByStatus(data);
  if (data.length === 0) {
    return <NoOrders />;
  }

  return (
    <div className="flex flex-col gap-4">
      {groupedTradeOrders.map((group) => (
        <TransactionsGroup
          key={group.type}
          label={group.label}
          transactions={group.tradeOrders}
        />
      ))}
    </div>
  );
};
