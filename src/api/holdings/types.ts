export interface AllocationBySecurity {
  code: string;
  name: string;
  security: {
    id: number;
    isinCode: string;
    countryCode: string;
    currencyCode: string;
  };
  figures: {
    marketValue: number;
    tradeAmount: number;
    fxRate: number;
    amount: number;
    purchaseTradeAmount: number;
  };
}

export interface AllocationByType {
  code: string;
  name: string;
  figures: {
    marketValue: number;
    tradeAmount: number;
  };
  allocationsBySecurity: AllocationBySecurity[];
}

export interface AllPortfoliosHoldingsQuery {
  contact: {
    analytics: {
      allocationTopLevel: {
        portfolio: {
          currencyCode: string;
        };
        allocationByType: AllocationByType[];
      };
    };
  };
}

export interface PortfolioHoldingsQuery {
  portfolio: {
    analytics: {
      allocationTopLevel: {
        portfolio: {
          currencyCode: string;
        };
        allocationByType: AllocationByType[];
      };
    };
  };
}

export interface MarketHistoryDataPoint {
  price: number;
  date: string;
}

export type SecurityTypeCode =
  | "STOCK"
  | "FUND"
  | "ETFs"
  | "PE"
  | "BOND"
  | "C" // Collective investment
  | "CURRENCY";

export interface SecurityDetailsPosition {
  id: number;
  name: string;
  securityCode: string;
  isinCode: string;
  url: string;
  url2: string;
  currency: {
    securityCode: string;
  };
  latestMarketData?: {
    price: number;
    date: string;
  };
  type: {
    code: SecurityTypeCode;
    namesAsMap: Record<string, string>;
  };
  fxRate: number;
}

export interface SecurityDetailsQuery {
  security: SecurityDetailsPosition;
}

export interface SecurityMarketDataHistory {
  marketDataHistory: MarketHistoryDataPoint[];
}

export interface SecurityMarketDataHistoryQuery {
  security: SecurityMarketDataHistory;
}

export interface HoldingPosition {
  security: {
    id: number;
  };
  amount: number;
  accruedInterest: number;
  purchaseTradeAmount: number;
  marketValue: number;
  valueChangeAbsolute: number;
  valueChangeRelative: number;
}

export interface AllPortfoliosHoldingDetailsQuery {
  contact: {
    portfolioReport: {
      holdingPositions: HoldingPosition[];
    };
  };
}

export interface PortfolioHoldingDetailsQuery {
  portfolio: {
    portfolioReport: {
      holdingPositions: HoldingPosition[];
    };
  };
}
