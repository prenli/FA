import { gql } from "@apollo/client";

export const ALLOCATION_BY_SECURITY_TYPE_FIELDS = gql`
  fragment AllocationBySecurityTypeFields on AnalysisDTO {
    allocationTopLevel: grouppedAnalytics(key: "ALLOC") {
      allocationByType: grouppedAnalytics {
        code
        name
        figures: firstAnalysis {
          marketValue
        }
        allocationBySecurity: grouppedAnalytics {
          code
          name
          figures: firstAnalysis {
            marketValue
            amount
            tradeAmount
          }
        }
      }
    }
  }
`;
