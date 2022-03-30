import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { EmptyComponent } from "../../../components";

export const NoDocuments = () => {
  const { t } = useModifiedTranslation();
  return <EmptyComponent header={t("documentsPage.noDocuments")} />;
};
