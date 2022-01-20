import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "contexts/keycloakContext";
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
  const { error, data } = useQuery<AllPortfoliosHoldingDetailsQuery>(
    HOLDING_DETAILS_QUERY,
    {
      variables: {
        contactId: linkedContact,
      },
      fetchPolicy: "cache-first",
    }
  );

  return {
    error,
    data: data?.contact.portfolioReport.holdingPositions.find(
      (holding) => holding.security.securityCode === securityCode
    ),
  };
};
