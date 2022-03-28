import { useQuery, gql } from "@apollo/client";
import { useKeycloak } from "providers/KeycloakProvider";
import { getFetchPolicyOptions } from "../utils";
import { DOCUMENT_FIELDS } from "./fragments";
import { Document } from "./types";

const ALL_DOCUMENTS_QUERY = gql`
  ${DOCUMENT_FIELDS}
  query GetAllDocuments($contactId: Long, $filterTags: [String]) {
    contact(id: $contactId) {
      id
      documents(filterTags: $filterTags) {
        ...DocumentFields
      }
      portfolios {
        id
        documents(filterTags: $filterTags) {
          ...DocumentFields
        }
      }
    }
  }
`;

interface AllDocumentsQuery {
  contact: {
    documents: Document[];
    portfolios: {
      id: number;
      documents: Document[];
    }[];
  };
}

const filterTags: string[] = ["Online"];

export const useGetDocuments = (portfolioId?: string | undefined) => {
  const { linkedContact } = useKeycloak();
  const { loading, error, data } = useQuery<AllDocumentsQuery>(
    ALL_DOCUMENTS_QUERY,
    {
      variables: {
        contactId: linkedContact,
        filterTags,
      },
      ...getFetchPolicyOptions(`useGetDocuments.${linkedContact}`),
    }
  );

  return {
    loading,
    error,
    data: data && [
      ...data.contact.documents,
      ...getPortfoliosDocuments(data, portfolioId),
    ],
  };
};

// returns documents of specified portfolio if portfolioId is not given returns documents for all portfolios
const getPortfoliosDocuments = (
  data: AllDocumentsQuery,
  portfolioId: string | undefined
) =>
  data.contact.portfolios
    .filter((portfolio) =>
      portfolioId ? portfolio.id === parseInt(portfolioId) : true
    )
    .map((portfolio) => portfolio.documents)
    .flat();
