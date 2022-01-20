import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "../../contexts/keycloakContext";
import { ALLOCATION_BY_SECURITY_TYPE_FIELDS } from "./fragments";
import { AllPortfoliosHoldingsQuery } from "./types";

const HOLDINGS_QUERY = gql`
  ${ALLOCATION_BY_SECURITY_TYPE_FIELDS}
  query GetTransactions($contactId: Long, $locale: Locale) {
    contact(id: $contactId) {
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

export const useGetAllPortfoliosHoldings = () => {
  const { linkedContact } = useKeycloak();
  const { i18n } = useTranslation();
  const { error, data } = useQuery<AllPortfoliosHoldingsQuery>(HOLDINGS_QUERY, {
    variables: {
      contactId: linkedContact,
      locale: i18n.language,
    },
    fetchPolicy: "cache-first",
  });

  return {
    error,
    data: data?.contact.analytics.allocationTopLevel.allocationByType,
  };
};
