import { gql, useQuery } from "@apollo/client";
import { fallbackLanguage } from "i18n";
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
        shortName
        currency {
          securityCode
        }
      }
    }
  }
`;

export interface ContactInfoQuery {
  contact?: {
    id: number;
    language: {
      locale: string;
    };
    portfolios?: {
      id: number;
      name: string;
      shortName: string;
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
      contactId: data.contact?.id,
      portfolios: data.contact?.portfolios || [],
      locale: data.contact?.language?.locale || fallbackLanguage,
      // all contact portfolios have same currency
      portfoliosCurrency:
        data.contact?.portfolios?.[0].currency.securityCode || "",
    },
  };
};
