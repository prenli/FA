import { gql } from "@apollo/client";

export const PERFORMANCE_PORTFOLIO_INDEXED_VALUE = gql`
  query PortfolioIndexedValue($portfolioId: Long, $timePeriod: [String]) {
    portfolio(id: $portfolioId) {
      graph: analytics(
        withoutPositionData: true
        parameters: {
          paramsSet: {
            timePeriodCodes: $timePeriod
            includeData: true
            drilldownEnabled: false
            limit: 0
          }
          includeDrilldownPositions: false
        }
      ) {
        dailyValues: grouppedAnalytics(key: "1") {
          dailyValue: indexedReturnData {
            date
            indexedValue
            benchmarkIndexedValue
          }
        }
      }
    }
  }
`;
