import { gql, useLazyQuery } from "@apollo/client";

const DOCUMENT_DATA_QUERY = gql`
  query GetDocumentData($identifier: String) {
    document(identifier: $identifier) {
      url
      fileName
    }
  }
`;

interface DocumentDataQuery {
  document: {
    url: string;
    fileName: string;
  };
}

export const useGetDocumentData = () => {
  const [performQuery] = useLazyQuery<DocumentDataQuery>(DOCUMENT_DATA_QUERY, {
    fetchPolicy: "no-cache",
  });
  const getDocumentData = async (identifier: string) => {
    return await performQuery({
      variables: {
        identifier,
      },
    });
  };

  return { getDocumentData };
};
