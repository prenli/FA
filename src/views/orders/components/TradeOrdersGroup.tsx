import React from "react";
import { TradeOrder } from "api/orders/types";
import { Card } from "components";
import { Transaction } from "../../transactions/components/Transaction";

interface Props {
  label: string;
  tradeOrders: TradeOrder[];
}

export const TradeOrdersGroup: React.FC<Props> = ({ label, tradeOrders }) => {
  return (
    <Card header={label}>
      <div className="px-2">
        <div className="flex flex-col divide-y">
          {tradeOrders.map((tradeOrder) => (
            <Transaction key={tradeOrder.id} {...tradeOrder} />
          ))}
        </div>
      </div>
    </Card>
  );
};
