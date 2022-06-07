import { ORDER_STATUS } from "./enums";

type Values<T> = T[keyof T];
export type OrderStatus = Values<typeof ORDER_STATUS>;

export interface TradeOrderType {
  typeName: string;
  typeNamesAsMap?: Record<string, string>;
  cashFlowEffect: number;
  amountEffect: number;
}

export interface TradeOrder {
  id: number;
  amount?: number;
  orderStatus: OrderStatus;
  securityName: string;
  type: TradeOrderType;
  transactionDate: string;
  tradeAmountInPortfolioCurrency: number;
  parentPortfolio: {
    id: number;
    name: string;
    currency: {
      securityCode: string;
    };
  };
}

export interface AllTradeOrdersQuery {
  contact: {
    id: number;
    tradeOrders: TradeOrder[];
  };
}

export interface PortfolioTradeOrdersQuery {
  portfolio: {
    id: number;
    tradeOrders: TradeOrder[];
  };
}
