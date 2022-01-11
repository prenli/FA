import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "contexts/keycloakContext";
import { SUMMARY_FIELDS, PORTFOLIO_FIELDS } from "./fragments";
import { AllPortfoliosQuery } from "./types";

const CONTACT_QUERY = gql`
  ${SUMMARY_FIELDS}
  ${PORTFOLIO_FIELDS}
  query GetContact($contactId: Long) {
    contact(id: $contactId) {
      ...SummaryFields
      portfolios {
        ...PortfolioFields
      }
    }
  }
`;

export const useGetAllPortfolios = () => {
  const { linkedContact } = useKeycloak();
  const { error, data } = useQuery<AllPortfoliosQuery>(CONTACT_QUERY, {
    variables: {
      contactId: linkedContact,
    },
    fetchPolicy: "cache-and-network",
  });

  return { error, data: data?.contact };
};
