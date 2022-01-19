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
  valueChangeAbsolute: number;
  amount: number;
  security: {
    securityCode: string;
    name: string;
  };
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
