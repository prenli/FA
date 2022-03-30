import { ReactNode } from "react";
import { Document } from "api/documents/types";
import classNames from "classnames";
import { Card } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useMatchesBreakpoint } from "../../hooks/useMatchesBreakpoint";
import { DocumentRow } from "./components/DocumentRow";
import { NoDocuments } from "./components/NoDocuments";

interface DocumentsProps {
  data: Document[];
}

export const Documents = ({ data: documents }: DocumentsProps) => {
  const { t } = useModifiedTranslation();
  const isMdVersion = useMatchesBreakpoint("md");

  if (documents.length === 0) {
    return <NoDocuments />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card header={t("documentsPage.title")}>
        <div className="md:grid md:items-center px-2 md:px-0 divide-y md:grid-cols-[repeat(3,_auto)]">
          {isMdVersion && (
            <>
              <HeaderLabel>{t("documentsPage.name")}</HeaderLabel>
              <HeaderLabel align="right">{t("documentsPage.date")}</HeaderLabel>
              <HeaderLabel align="right">
                {t("documentsPage.download")}
              </HeaderLabel>
            </>
          )}
          {documents.map((document) => (
            <DocumentRow key={document.identifier} {...document} />
          ))}
        </div>
      </Card>
    </div>
  );
};

interface HeaderLabelProps {
  children: ReactNode;
  align?: "left" | "right";
}

const HeaderLabel = ({ children, align = "left" }: HeaderLabelProps) => {
  return (
    <div
      className={classNames(
        "py-1 px-2 text-sm font-semibold text-gray-500 bg-gray-100 border-t",
        {
          "text-left": align === "left",
          "text-right": align === "right",
        }
      )}
    >
      {children}
    </div>
  );
};
