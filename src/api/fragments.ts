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

const SECURITY_POSITIONS_FIELDS = gql`
  fragment SecurityPositionsFields on PortfolioReportItem {
    security {
      securityCode
      name
      isinCode
    }
    amount
    purchaseTradeAmount
    marketTradeAmount
    valueChangeAbsolute
  }
`;

export const DETAILED_PORTFOLIO_FIELDS = gql`
  ${SECURITY_POSITIONS_FIELDS}
  fragment DetailedPortfolioFields on Portfolio {
    id
    name
    currency {
      securityCode
    }
    portfolioReport {
      marketValue
      valueChangeAbsolute
      accountBalance
      positionMarketValue
      securityPositions: portfolioReportItems {
        ...SecurityPositionsFields
      }
    }
  }
`;
