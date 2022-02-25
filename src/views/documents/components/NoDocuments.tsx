import { useTranslation } from "react-i18next";

export const NoDocuments = () => {
  const { t } = useTranslation();
  return <div className="text-lg">{t("documentsPage.noDocuments")}</div>;
};
