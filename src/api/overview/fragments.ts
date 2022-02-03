import { gql } from "@apollo/client";

const PORTFOLIO_REPORT_FIELDS = gql`
  fragment PortfolioReportFields on PortfolioReport {
    marketValue
    positionMarketValue
    valueChangeAbsolute
    accountBalance
  }
`;

const PORTFOLIO_REPORT_FIELDS_WITH_ID = gql`
  ${PORTFOLIO_REPORT_FIELDS}
  fragment PortfolioReportFieldsWithId on PortfolioReport {
    portfolioId
    ...PortfolioReportFields
  }
`;

export const PORTFOLIO_FIELDS = gql`
  ${PORTFOLIO_REPORT_FIELDS_WITH_ID}
  fragment PortfolioFields on Portfolio {
    id
    name
    currency {
      securityCode
    }
    portfolioReport {
      ...PortfolioReportFieldsWithId
    }
  }
`;

const SECURITY_POSITIONS_FIELDS = gql`
  fragment SecurityPositionFields on PortfolioReportItem {
    portfolioId
    security {
      id
      securityCode
      name
    }
    valueChangeAbsolute
  }
`;

// to distinct Contact portfolioReport from Portfolio portfolioReport in Contact version we set portfolioId as portfolio.contact.id
export const SUMMARY_FIELDS = gql`
  ${PORTFOLIO_REPORT_FIELDS}
  fragment SummaryFields on Contact {
    id
    name
    portfolioReport {
      ...PortfolioReportFields
      portfolioId: portfolio {
        contact {
          id
        }
      }
    }
  }
`;

export const DETAILED_PORTFOLIO_FIELDS = gql`
  ${PORTFOLIO_REPORT_FIELDS_WITH_ID}
  ${SECURITY_POSITIONS_FIELDS}
  fragment DetailedPortfolioFields on Portfolio {
    id
    name
    currency {
      securityCode
    }
    portfolioReport {
      ...PortfolioReportFieldsWithId
      securityPositions: portfolioReportItems {
        ...SecurityPositionFields
      }
    }
    analytics(
      parameters: {
        paramsSet: {
          key: "holdingsByType"
          timePeriodCodes: "DAYS-1"
          grouppedByProperties: [TYPE]
          includeData: false
          includeChildren: true
          drilldownEnabled: false
          limit: 0
          locale: $locale
        }
        includeDrilldownPositions: false
      }
    ) {
      allocationTopLevel: grouppedAnalytics(key: "holdingsByType") {
        portfolio {
          id
        }
        allocationByType: grouppedAnalytics {
          code
          name
          figures: firstAnalysis {
            shareOfTotal
          }
        }
      }
    }
  }
`;
