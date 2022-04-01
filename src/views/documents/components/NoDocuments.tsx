import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { ErrorMessage } from "../../../components";

export const NoDocuments = () => {
  const { t } = useModifiedTranslation();
  return <ErrorMessage header={t("documentsPage.noDocuments")} />;
};
