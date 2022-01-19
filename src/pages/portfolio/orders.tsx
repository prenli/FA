import React from "react";
import { useGetPortfolioTradeOrders } from "api/orders/useGetPortfolioTradeOrders";
import { QueryLoadingWrapper } from "components";
import { useParams } from "react-router-dom";
import { Orders } from "views/orders/orders";

export const OrdersPage = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolioTradeOrders(portfolioId);

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Orders} />;
};
