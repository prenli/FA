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
