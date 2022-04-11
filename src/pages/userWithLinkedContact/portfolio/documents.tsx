import { useGetDocuments } from "api/documents/useGetDocuments";
import { QueryLoadingWrapper } from "components";
import { useParams } from "react-router-dom";
import { Documents } from "views/documents/documents";

export const DocumentsPage = () => {
  const { portfolioId } = useParams();
  const queryData = useGetDocuments(portfolioId);

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Documents} />;
};
