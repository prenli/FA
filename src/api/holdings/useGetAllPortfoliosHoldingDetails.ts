import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { useGetContractIdData } from "providers/ContractIdProvider";
import { useKeycloak } from "providers/KeycloakProvider";
import { ALL_PORTFOLIOS_REPORT_HOLDINGS_DETAILS_FIELDS } from "./fragments";
import { AllPortfoliosHoldingDetailsQuery } from "./types";

const HOLDING_DETAILS_QUERY = gql`
  ${ALL_PORTFOLIOS_REPORT_HOLDINGS_DETAILS_FIELDS}
  query GetAllPortfoliosHoldingDetails($contactId: Long) {
    contact(id: $contactId) {
      id
      portfolioReport {
        ...AllPortfoliosReportHoldingDetailsFields
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
  securityId: string | undefined
) => {
  const { linkedContact } = useKeycloak();
  const { selectedContactId } = useGetContractIdData();
  const { loading, error, data } = useQuery<AllPortfoliosHoldingDetailsQuery>(
    HOLDING_DETAILS_QUERY,
    {
      variables: {
        contactId: selectedContactId || linkedContact,
      },
      ...getFetchPolicyOptions(
        `useGetAllPortfoliosHoldingDetails.${selectedContactId || linkedContact}`
      ),
    }
  );

  return {
    loading,
    error,
    data: data?.contact.portfolioReport.holdingPositions?.find(
      (holding) => holding.security.id.toString() === securityId
    ),
  };
};
