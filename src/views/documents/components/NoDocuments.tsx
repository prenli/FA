import { useTranslation } from "react-i18next";
import { EmptyComponent } from "../../../components";

export const NoDocuments = () => {
  const { t } = useTranslation();
  return <EmptyComponent header={t("documentsPage.noDocuments")} />;
};
