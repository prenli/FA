import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "providers/KeycloakProvider";
import { useTranslation } from "react-i18next";
import { getFetchPolicyOptions } from "../utils";
import { ALLOCATION_BY_SECURITY_TYPE_FIELDS } from "./fragments";
import { AllPortfoliosHoldingsQuery } from "./types";

// to distinct Contact analytics from Portfolio analytics in Contact version we set portfolio.id as portfolio.parentPortfolioId (line 32)
const HOLDINGS_QUERY = gql`
  ${ALLOCATION_BY_SECURITY_TYPE_FIELDS}
  query GetHoldings($contactId: Long, $locale: Locale) {
    contact(id: $contactId) {
      id
      analytics(
        parameters: {
          paramsSet: {
            key: "allHoldingsByTypeBySecurity"
            timePeriodCodes: "DAYS-0"
            grouppedByProperties: [TYPE, SECURITY]
            includeData: false
            includeChildren: true
            drilldownEnabled: false
            limit: 0
            locale: $locale
          }
          includeDrilldownPositions: false
        }
      ) {
        allocationTopLevel: grouppedAnalytics(
          key: "allHoldingsByTypeBySecurity"
        ) {
          portfolio {
            id: parentPortfolioId
            currencyCode
          }
          ...AllocationBySecurityTypeFields
        }
      }
    }
  }
`;

export const useGetAllPortfoliosHoldings = () => {
  const { linkedContact } = useKeycloak();
  const { i18n } = useTranslation();
  const { loading, error, data } = useQuery<AllPortfoliosHoldingsQuery>(
    HOLDINGS_QUERY,
    {
      variables: {
        contactId: linkedContact,
        locale: i18n.language,
      },
      ...getFetchPolicyOptions(`useGetAllPortfoliosHoldings.${linkedContact}`),
    }
  );

  return {
    loading,
    error,
    data: data && {
      allocationByType:
        data.contact.analytics.allocationTopLevel.allocationByType,
      currency:
        data.contact.analytics.allocationTopLevel.portfolio.currencyCode,
    },
  };
};
