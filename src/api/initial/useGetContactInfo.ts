import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "contexts/keycloakContext";

const CONTACT_INFO_QUERY = gql`
  query GetContactInfo($contactId: Long) {
    contact(id: $contactId) {
      id
      language {
        locale
      }
    }
  }
`;

export interface ContactInfoQuery {
  contact: {
    language: {
      locale: string;
    };
  };
}

export const useGetContactInfo = () => {
  const { linkedContact } = useKeycloak();
  const { error, data } = useQuery<ContactInfoQuery>(CONTACT_INFO_QUERY, {
    variables: {
      contactId: linkedContact,
    },
    fetchPolicy: "cache-first",
  });

  return { data, error };
};
