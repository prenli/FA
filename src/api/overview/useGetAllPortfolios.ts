import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { useKeycloak } from "providers/KeycloakProvider";
import { SUMMARY_FIELDS, PORTFOLIO_FIELDS } from "./fragments";
import { AllPortfoliosQuery } from "./types";

const CONTACT_QUERY = gql`
  ${SUMMARY_FIELDS}
  ${PORTFOLIO_FIELDS}
  query GetContact($contactId: Long) {
    contact(id: $contactId) {
      id
      ...SummaryFields
      portfolios {
        ...PortfolioFields
      }
    }
  }
`;

export const useGetAllPortfolios = () => {
  const { linkedContact } = useKeycloak();
  const { loading, error, data } = useQuery<AllPortfoliosQuery>(CONTACT_QUERY, {
    variables: {
      contactId: linkedContact,
    },
    ...getFetchPolicyOptions(`useGetAllPortfolios.${linkedContact}`),
  });

  return { loading, error, data: data?.contact };
};
