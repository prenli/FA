import React from "react";
import { useGetPortfolioTradeOrders } from "api/orders/useGetPortfolioTradeOrders";
import { useParams } from "react-router-dom";
import { Orders } from "views/orders/orders";

export const OrdersPage = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolioTradeOrders(portfolioId);

  return <Orders {...queryData} />;
};
