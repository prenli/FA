import { TradeOrder } from "api/orders/types";
import { TransactionsGroup } from "../../transactions/components/TransactionsGroup";
import { NoOrders } from "./NoOrders";
import { useGroupedTradeOrdersByStatus } from "./useGroupedTradeOrdersByStatus";

interface OrdersContainerProps {
  data: {
    startDate: Date;
    endDate: Date;
    orders: TradeOrder[] | undefined;
  };
}

export const OrdersContainer = ({
  data: { startDate, endDate, orders },
}: OrdersContainerProps) => {
  const groupedTradeOrders = useGroupedTradeOrdersByStatus(orders);
  if (!orders || orders.length === 0) {
    return <NoOrders startDate={startDate} endDate={endDate} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {groupedTradeOrders.map(
        (group) =>
          group.tradeOrders.length > 0 && (
            <TransactionsGroup
              key={group.type}
              label={group.label}
              transactions={group.tradeOrders}
              type="order"
            />
          )
      )}
    </div>
  );
};
