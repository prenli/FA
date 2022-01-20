import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { ALLOCATION_BY_SECURITY_TYPE_FIELDS } from "./fragments";
import { PortfolioHoldingsQuery } from "./types";

const HOLDINGS_QUERY = gql`
  ${ALLOCATION_BY_SECURITY_TYPE_FIELDS}
  query GetTransactions($portfolioId: Long, $locale: Locale) {
    portfolio(id: $portfolioId) {
      id
      analytics(
        parameters: {
          paramsSet: {
            key: "ALLOC"
            timePeriodCodes: "DAYS-0"
            grouppedByProperties: [TYPE, SECURITY]
            includeData: false
            includeChildren: true
            drilldownEnabled: false
            limit: 0
            locale: $locale
          }
          includeDrilldownPositions: false
          security: false
        }
      ) {
        ...AllocationBySecurityTypeFields
      }
    }
  }
`;

export const useGetPortfolioHoldings = (portfolioId: string | undefined) => {
  const { i18n } = useTranslation();
  const { error, data } = useQuery<PortfolioHoldingsQuery>(HOLDINGS_QUERY, {
    variables: {
      portfolioId: portfolioId,
      locale: i18n.language,
    },
    fetchPolicy: "cache-first",
  });

  return {
    error,
    data: data?.portfolio.analytics.allocationTopLevel.allocationByType,
  };
};
