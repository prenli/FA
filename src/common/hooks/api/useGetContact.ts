import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "contexts/keycloakContext";

const CONTACT_QUERY = `
query GetContact($contactId: Long) {
  contact(id: $contactId) {
    id
    name
    portfolios {
      id
      name
      type {
        code
        name
      }
      portfolioReport {
        marketValue
        accuredInterest
        accountBalance
      }
    }
  }
}`;

export const useGetContact = () => {
  const { linkedContact } = useKeycloak();
  const { loading, error, data } = useQuery(gql(CONTACT_QUERY), {
    variables: {
      contactId: linkedContact,
    },
    fetchPolicy: "cache-and-network",
  });

  return { loading, error, data };
};
