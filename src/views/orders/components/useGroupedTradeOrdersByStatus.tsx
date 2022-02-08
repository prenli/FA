import { useMemo } from "react";
import { ORDER_STATUS } from "api/orders/enums";
import { OrderStatus, TradeOrder } from "api/orders/types";

// HINT: Add or remove ORDER_STATUS from this list to modify trade orders groups on "Trade Orders" tab.
const GROUP_TYPES_TO_DISPLAY = [
  ORDER_STATUS.Open, // TODO: translate status names when API is ready
  ORDER_STATUS["In execution"],
  ORDER_STATUS.Accepted,
  ORDER_STATUS.Cancelled,
];

export interface TradeOrdersGroup {
  type: OrderStatus;
  label: string;
  tradeOrders: TradeOrder[];
}

export const useGroupedTradeOrdersByStatus = (tradeOrders: TradeOrder[]) => {
  return useMemo(() => {
    const grouped: TradeOrdersGroup[] = [];

    tradeOrders.forEach((tradeOrder) => {
      const orderStatus = tradeOrder.orderStatus;

      let indexOfGrouped = grouped.findIndex(
        (group) => group.type === orderStatus
      );

      if (indexOfGrouped === -1) {
        indexOfGrouped = grouped.length;

        grouped.push({
          type: orderStatus,
          label: ORDER_STATUS[orderStatus],
          tradeOrders: [],
        });
      }
      grouped[indexOfGrouped].tradeOrders.push(tradeOrder);
    });

    return grouped.filter((group) =>
      GROUP_TYPES_TO_DISPLAY.includes(Number(group.type))
    );
  }, [tradeOrders]);
};
