export interface AllocationBySecurity {
  code: string;
  name: string;
  security: {
    isinCode: string;
    countryCode: string;
  };
  figures: {
    marketValue: number;
    tradeAmount: number;
  };
}

export interface AllocationByType {
  code: string;
  name: string;
  figures: {
    marketValue: number;
    tradeAmount: number;
  };
  allocationBySecurity: AllocationBySecurity[];
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

interface MarketHistoryDataPoint {
  price: number;
  date: string;
}

export interface SecurityDetailsPosition {
  id: number;
  name: string;
  isinCode: string;
  securityCode: string;
  url: string;
  url2: string;
  currency: {
    securityCode: string;
  };
  latestMarketData: {
    close: number;
  };
  marketDataHistory: MarketHistoryDataPoint[];
  type: {
    code: string;
    namesAsMap: Record<string, string>;
  };
}

export interface SecurityDetailsQuery {
  securities: SecurityDetailsPosition[];
}

export interface HoldingPosition {
  security: {
    securityCode: string;
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
