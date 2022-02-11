import { Document } from "api/documents/types";
import { Card } from "components";
import { useTranslation } from "react-i18next";
import { DocumentRow } from "./components/DocumentRow";

interface DocumentsProps {
  data: Document[];
}

export const Documents = ({ data: documents }: DocumentsProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <Card header={t("documentsPage.title")}>
        <div className="px-2 divide-y">
          {documents.map((document) => (
            <DocumentRow key={document.identifier} {...document} />
          ))}
        </div>
      </Card>
    </div>
  );
};
