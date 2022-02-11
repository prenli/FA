import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { useKeycloak } from "providers/KeycloakProvider";
import { PORTFOLIO_REPORT_HOLDINGS_DETAILS_FIELDS } from "./fragments";
import { AllPortfoliosHoldingDetailsQuery } from "./types";

const HOLDING_DETAILS_QUERY = gql`
  ${PORTFOLIO_REPORT_HOLDINGS_DETAILS_FIELDS}
  query GetAllPortfoliosHoldingDetails($contactId: Long) {
    contact(id: $contactId) {
      id
      portfolioReport {
        ...PortfolioReportHoldingDetailsFields
        portfolioId: portfolio {
          id
          contact {
            id
          }
        }
      }
    }
  }
`;

export const useGetAllPortfoliosHoldingDetails = (
  securityCode: string | undefined
) => {
  const { linkedContact } = useKeycloak();
  const { loading, error, data } = useQuery<AllPortfoliosHoldingDetailsQuery>(
    HOLDING_DETAILS_QUERY,
    {
      variables: {
        contactId: linkedContact,
      },
      ...getFetchPolicyOptions(
        `useGetAllPortfoliosHoldingDetails.${linkedContact}`
      ),
    }
  );

  return {
    loading,
    error,
    data: data?.contact.portfolioReport.holdingPositions.find(
      (holding) => holding.security.securityCode === securityCode
    ),
  };
};
