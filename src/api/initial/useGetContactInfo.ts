import { gql, useQuery } from "@apollo/client";
import { fallbackLanguage } from "i18n";
import { useKeycloak } from "providers/KeycloakProvider";
import { TradePermissionGroup } from "services/permissions/trade";

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
        portfolioGroups {
          id
          code
        }
      }
    }
  }
`;

interface PortfolioGroup {
  code: typeof TradePermissionGroup; // TODO: add deposit and withdrawal groups
}

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
      portfolioGroups: PortfolioGroup[];
    }[];
  };
}

export const useGetContactInfo = (callAPI = false) => {
  const { linkedContact } = useKeycloak();
  const { loading, error, data } = useQuery<ContactInfoQuery>(
    CONTACT_INFO_QUERY,
    {
      variables: {
        contactId: linkedContact,
      },
      fetchPolicy: callAPI ? "cache-and-network" : "cache-first",
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
        data.contact?.portfolios?.[0]?.currency.securityCode || "",
    },
  };
};
