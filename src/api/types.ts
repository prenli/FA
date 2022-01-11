interface Summary {
  id: number;
  name: string;
  portfolioReport: {
    marketValue: number;
    valueChangeAbsolute: number;
    accountBalance: number;
    positionMarketValue: number;
  };
}

interface Portfolio extends Summary {
  currency: {
    securityCode: string;
  };
}

export interface AllPortfolios extends Summary {
  portfolios: Portfolio[];
}

export interface AllPortfoliosQuery {
  contact: AllPortfolios;
}
