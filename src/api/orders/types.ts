import { ORDER_STATUS } from "./enums";

export type OrderStatus = `${ORDER_STATUS}`;

export interface TradeOrder {
  id: number;
  orderStatus: OrderStatus;
  securityName: string;
  type: {
    typeName: string;
    typeNamesAsMap: Record<string, string>;
    cashFlowEffect: number;
    amountEffect: number;
  };
  transactionDate: string;
  tradeAmountInPortfolioCurrency: number;
  parentPortfolio: {
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
