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
      allocationBySecurity: grouppedAnalytics {
        code
        name
        security {
          isinCode
          countryCode
        }
        figures: firstAnalysis {
          marketValue
          tradeAmount
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
        securityCode
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
