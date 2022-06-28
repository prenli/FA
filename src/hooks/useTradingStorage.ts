// when user place order (buy/sell security/cash) we keep that order in local storage until backend handle it

import { useEffect, useMemo } from "react";
import { TradeOrder } from "api/orders/types";
import { Transaction } from "api/transactions/types";
import { dateFromYYYYMMDD, isDateInRange } from "utils/date";
import { useGetAllTradeOrders } from "../api/orders/useGetAllTradeOrders";
import { useGetPortfolioTradeOrders } from "../api/orders/useGetPortfolioTradeOrders";
import { useGetAllPortfoliosTransactions } from "../api/transactions/useGetAllPortfoliosTransactions";
import { useGetPortfolioTransactions } from "../api/transactions/useGetPortfolioTransactions";
import { useLocalStorageState } from "./useLocalStorageState";

export type LocalOrder = TradeOrder;

export const isLocalOrder = (
  order: LocalOrder | TradeOrder | Transaction
): order is LocalOrder => {
  return (order as LocalOrder).id === LocalTradeOrderId;
};

export const LocalTradeOrderId = -1;
export const LocalTradeOrderStatus = "-1";

export const useTradingStorage = (portfolioId?: string) => {
  const [orders, setOrders] = useLocalStorageState<LocalOrder[]>(
    "tradingStorage",
    []
  );

  const { transactions: apiTransactions, tradeOrders: apiTradeorders } =
    useGetTradeOrdersAndTransactions(portfolioId);

  useEffect(() => {
    // check API if some orders are already handled and if they are, remove them from local storage
    let storageChanged = false;
    const filteredOrders = orders.filter((order) => {
      const isHandled =
        apiTransactions.some(
          (transaction) => transaction.reference === order.reference
        ) ||
        apiTradeorders.some(
          (tradeOrder) => tradeOrder.reference === order.reference
        );
      if (isHandled) {
        storageChanged = true;
        return false;
      }
      return true;
    });
    if (storageChanged) {
      setOrders(filteredOrders);
    }
  }, [apiTransactions, apiTradeorders, orders, setOrders]);

  const placeOrder = async (order: TradeOrder) => {
    setOrders([...orders, order]);
  };

  const getOrdersForDateRange = (startDate: Date, endDate: Date) => {
    return orders.filter((order) => {
      if (portfolioId && order.parentPortfolio.id !== parseInt(portfolioId)) {
        return false;
      }

      const orderDate = dateFromYYYYMMDD(order.transactionDate);
      return isDateInRange(orderDate, startDate, endDate);
    });
  };

  const getUnhandledOrdersForDateRange = (
    handledOrders: TradeOrder[] | undefined,
    startDate: Date,
    endDate: Date
  ) => {
    if (!handledOrders) {
      return [];
    }
    return getOrdersForDateRange(startDate, endDate);
  };

  return { orders, placeOrder, getUnhandledOrdersForDateRange };
};

const useGetTradeOrdersAndTransactions = (portfolioId?: string) => {
  const { data: allPortfoliosTradeOrders = [] } = useGetAllTradeOrders({
    fetchPolicy: "cache-first",
    skip: !!portfolioId,
  });
  const { data: portfolioTradeOrders = [] } = useGetPortfolioTradeOrders(
    portfolioId,
    {
      fetchPolicy: "cache-first",
      skip: !portfolioId,
    }
  );
  const { data: allPortfoliosTransactions = [] } =
    useGetAllPortfoliosTransactions({
      fetchPolicy: "cache-first",
      skip: !!portfolioId,
    });
  const { data: portfolioTransactions = [] } = useGetPortfolioTransactions(
    portfolioId,
    {
      fetchPolicy: "cache-first",
      skip: !portfolioId,
    }
  );

  return {
    tradeOrders: useMemo(
      () => [...allPortfoliosTradeOrders, ...portfolioTradeOrders],
      [allPortfoliosTradeOrders, portfolioTradeOrders]
    ),
    transactions: useMemo(
      () => [...allPortfoliosTransactions, ...portfolioTransactions],
      [allPortfoliosTransactions, portfolioTransactions]
    ),
  };
};
