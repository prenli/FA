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
        currency {
          securityCode
        }
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
      currency: {
        securityCode: string;
      };
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

  return {
    loading,
    error,
    data: data && {
      portfolios: data.contact.portfolios,
      language: data.contact.language.locale,
      // all contact portfolios have same currency
      portfoliosCurrency: data.contact.portfolios[0].currency.securityCode,
    },
  };
};
