import React from "react";
import { TradeOrder } from "api/orders/types";
import { Card } from "components";
import { TradeOrderPosition } from "../TradeOrderPosition/TradeOrderPosition";

interface Props {
  label: string;
  tradeOrders: TradeOrder[];
}

export const TradeOrdersGroup: React.FC<Props> = ({ label, tradeOrders }) => {
  return (
    <Card>
      <div className="p-2">
        <div className="py-1 text-lg font-semibold capitalize border-b">
          {label}
        </div>
        <div className="flex flex-col divide-y">
          {tradeOrders.map((tradeOrder) => (
            <TradeOrderPosition key={tradeOrder.id} {...tradeOrder} />
          ))}
        </div>
      </div>
    </Card>
  );
};
