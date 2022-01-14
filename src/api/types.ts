import { ORDER_STATUS, SECURITY_TYPE } from "./enums";

export const assertUnreachable = (_exhaustiveCheck: never) => {
  console.error(`Unreachable case: ${_exhaustiveCheck}`);
};

type SecurityTypeKeys = keyof typeof SECURITY_TYPE;
export type SecurityType = typeof SECURITY_TYPE[SecurityTypeKeys];

interface Security {
  id: number;
  securityCode: string;
  name: string;
  isinCode: string;
  type: {
    code: SecurityType;
  };
  latestMarketData: {
    latestPrice: number;
  };
}

interface BaseReport {
  marketValue: number;
  valueChangeAbsolute: number;
  accountBalance: number;
  positionMarketValue: number;
}

interface Summary<TReport extends BaseReport = BaseReport> {
  id: number;
  name: string;
  portfolioReport: TReport;
  isinCode: string;
}

export interface SecurityPosition {
  purchaseTradeAmount: number;
  marketTradeAmount: number;
  valueChangeAbsolute: number;
  amount: number;
  security: Security;
}

interface DetailedReport extends BaseReport {
  securityPositions: SecurityPosition[];
}

type DetailedSummary = Summary<DetailedReport>;

interface Portfolio extends Summary {
  currency: {
    securityCode: string;
  };
}

export interface DetailedPortfolio extends DetailedSummary {
  currency: {
    securityCode: string;
  };
}

export interface AllPortfolios extends DetailedSummary {
  portfolios: Portfolio[];
}

export interface AllPortfoliosQuery {
  contact: AllPortfolios;
}

export interface PortfolioQuery {
  portfolio: DetailedPortfolio;
}

export type OrderStatus = `${ORDER_STATUS}`;

export interface TradeOrder {
  id: number;
  orderStatus: OrderStatus;
  securityName: string;
  type: {
    typeName: string;
    typeNamesAsMap: Record<string, string>;
  };
  transactionDate: string;
  tradeAmountInPortfolioCurrency: number;
  parentPortfolio: {
    name: string;
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
