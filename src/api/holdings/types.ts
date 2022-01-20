export interface AllocationBySecurity {
  code: string;
  name: string;
  figures: {
    marketValue: number;
    amount: number;
    tradeAmount: number;
  };
}

export interface AllocationByType {
  code: string;
  name: string;
  figures: {
    marketValue: number;
  };
  allocationBySecurity: AllocationBySecurity[];
}

export interface AllPortfoliosHoldingsQuery {
  contact: {
    analytics: {
      allocationTopLevel: {
        allocationByType: AllocationByType[];
      };
    };
  };
}

export interface PortfolioHoldingsQuery {
  portfolio: {
    analytics: {
      allocationTopLevel: {
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
