import { gql } from "@apollo/client";

export const ALLOCATION_BY_SECURITY_TYPE_FIELDS = gql`
  fragment AllocationBySecurityTypeFields on GrouppedAnalyticsDTO {
    allocationByType: grouppedAnalytics {
      code
      name
      figures: firstAnalysis {
        marketValue
        tradeAmount
      }
      allocationsBySecurity: grouppedAnalytics {
        code
        name
        security {
          id
          isinCode
          countryCode
          currencyCode
        }
        figures: firstAnalysis {
          marketValue
          tradeAmount
          fxRate
          amount
          purchaseTradeAmount
        }
      }
    }
  }
`;

export const PORTFOLIO_REPORT_HOLDINGS_DETAILS_FIELDS = gql`
  fragment PortfolioReportHoldingDetailsFields on PortfolioReport {
    holdingPositions: portfolioReportItems {
      portfolioId
      security {
        id
      }
      amount
      accruedInterest
      purchaseTradeAmount
      marketValue
      valueChangeAbsolute
      valueChangeRelative
    }
  }
`;

// all portfolios does not have identifier for holdingPositions (portfolioID returns id of first portfolio)
// this is why we use
// portfolioId: portfolio {
//   id
//   contact {
//     id
//   }
// }
export const ALL_PORTFOLIOS_REPORT_HOLDINGS_DETAILS_FIELDS = gql`
  fragment AllPortfoliosReportHoldingDetailsFields on PortfolioReport {
    holdingPositions: portfolioReportItems {
      portfolioId: portfolio {
        id
        contact {
          id
        }
      }
      security {
        id
      }
      amount
      accruedInterest
      purchaseTradeAmount
      marketValue
      valueChangeAbsolute
      valueChangeRelative
    }
  }
`;
