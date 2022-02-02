import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "providers/KeycloakProvider";
import { getFetchPolicyOptions } from "../utils";

const CONTACT_INFO_QUERY = gql`
  query GetContactInfo($contactId: Long) {
    contact(id: $contactId) {
      id
      language {
        locale
      }
      portfolios {
        id
        name
      }
    }
  }
`;

export interface ContactInfoQuery {
  contact: {
    language: {
      locale: string;
    };
    portfolios: {
      id: number;
      name: string;
    }[];
  };
}

export const useGetContactInfo = () => {
  const { linkedContact } = useKeycloak();
  const { loading, error, data } = useQuery<ContactInfoQuery>(
    CONTACT_INFO_QUERY,
    {
      variables: {
        contactId: linkedContact,
      },
      ...getFetchPolicyOptions(`useGetContactInfo.${linkedContact}`),
    }
  );

  return { loading, data, error };
};
