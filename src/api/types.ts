interface Security {
  securityCode: string;
  name: string;
  isinCode: string;
}

export interface SecurityPosition {
  purchaseTradeAmount: number;
  marketTradeAmount: number;
  valueChangeAbsolute: number;
  amount: number;
  security: Security;
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

export interface AllPortfolios extends Summary {
  portfolios: Portfolio[];
}

export interface AllPortfoliosQuery {
  contact: AllPortfolios;
}

export interface PortfolioQuery {
  portfolio: DetailedPortfolio;
}
