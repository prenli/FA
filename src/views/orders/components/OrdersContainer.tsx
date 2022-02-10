import { TradeOrder } from "api/orders/types";
import { NoOrders } from "./NoOrders";
import { TradeOrdersGroup } from "./TradeOrdersGroup";
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
        <TradeOrdersGroup
          key={group.type}
          label={group.label}
          tradeOrders={group.tradeOrders}
        />
      ))}
    </div>
  );
};
