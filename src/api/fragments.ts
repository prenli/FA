import { gql } from "@apollo/client";

export const SUMMARY_FIELDS = gql`
  fragment SummaryFields on Contact {
    id
    name
    portfolioReport {
      marketValue
      positionMarketValue
      valueChangeAbsolute
      accountBalance
    }
  }
`;

export const PORTFOLIO_FIELDS = gql`
  fragment PortfolioFields on Portfolio {
    id
    name
    currency {
      securityCode
    }
    portfolioReport {
      marketValue
      positionMarketValue
      valueChangeAbsolute
      accountBalance
    }
  }
`;
