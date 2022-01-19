import React from "react";
import { TradeOrder } from "api/orders/types";
import { TradeOrdersGroup } from "./TradeOrdersGroup/TradeOrdersGroup";
import { useGroupedTradeOrdersByStatus } from "./useGroupedTradeOrdersByStatus";

interface OrdersProps {
  data: TradeOrder[];
}

export const Orders = ({ data }: OrdersProps) => {
  const groupedTradeOrders = useGroupedTradeOrdersByStatus(data);

  return (
    <div className="flex flex-col gap-3">
      {groupedTradeOrders.length >= 1 ? (
        groupedTradeOrders.map((group) => (
          <TradeOrdersGroup
            key={group.type}
            label={group.label}
            tradeOrders={group.tradeOrders}
          />
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};
