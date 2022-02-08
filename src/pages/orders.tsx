import React from "react";
import { useGetAllTradeOrders } from "api/orders/useGetAllTradeOrders";
import { Orders } from "views/orders/orders";

export const OrdersPage = () => {
  const queryData = useGetAllTradeOrders();

  return <Orders {...queryData} />;
};
