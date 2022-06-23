// when user place order (buy/sell security) we keep that order in local storage until backend handle it

import { TradeOrder } from "api/orders/types";
import { Transaction } from "api/transactions/types";
import { dateFromYYYYMMDD, isDateInRange } from "utils/date";
import { useLocalStorageState } from "./useLocalStorageState";

export type LocalOrder = TradeOrder;

export const isLocalOrder = (
  order: LocalOrder | TradeOrder | Transaction
): order is LocalOrder => {
  return (order as LocalOrder).id === LocalTradeOrderId;
};

export const LocalTradeOrderId = -1;
export const LocalTradeOrderStatus = "-1";

export const useTradingStorage = () => {
  const [orders, setOrders] = useLocalStorageState<LocalOrder[]>(
    "tradingState",
    []
  );

  const placeOrder = async (order: TradeOrder) => {
    setOrders([...orders, order]);
  };

  const removeBackendHandledOrders = (handledOrders: TradeOrder[]) => {
    // TODO: remove handled orders from local storage - referenceId for matching not defined yet
  };

  const getOrdersForDateRange = (
    startDate: Date,
    endDate: Date,
    portfolioId?: number
  ) => {
    return orders.filter((order) => {
      if (portfolioId && order.parentPortfolio.id !== portfolioId) {
        return false;
      }

      const orderDate = dateFromYYYYMMDD(order.transactionDate);
      return isDateInRange(orderDate, startDate, endDate);
    });
  };

  const getUnhandledOrdersForDateRange = (
    handledOrders: TradeOrder[] | undefined,
    startDate: Date,
    endDate: Date,
    portfolioId?: string
  ) => {
    if (!handledOrders) {
      return [];
    }
    removeBackendHandledOrders(handledOrders);
    return getOrdersForDateRange(
      startDate,
      endDate,
      portfolioId ? parseInt(portfolioId, 10) : undefined
    );
  };

  return { orders, placeOrder, getUnhandledOrdersForDateRange };
};
