import React from "react";
import { useGetAllTradeOrders } from "api/useGetAllTradeOrders";
import { QueryLoadingWrapper } from "components";
import { Orders } from "views/orders/orders";

export const OrdersPage = () => {
  const queryData = useGetAllTradeOrders();

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Orders} />;
};
