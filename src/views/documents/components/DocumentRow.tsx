import { Document } from "api/documents/types";
import { ReactComponent as DownloadIcon } from "assets/download.svg";
import { Button } from "components";
import { useTranslation } from "react-i18next";
import { useDownloadDocument } from "../../../api/documents/useDownloadDocument";

type DocumentRowProps = Document;

export const DocumentRow = ({
  identifier,
  fileName,
  created,
}: DocumentRowProps) => {
  const { t } = useTranslation();
  const { downloadDocument, downloading } = useDownloadDocument();
  return (
    <div className="flex gap-2 justify-between items-center py-2">
      <div className="overflow-hidden ">
        <div className="text-base font-semibold truncate">{fileName}</div>
        <div className="text-sm font-semibold text-gray-500">
          {t("date", { date: new Date(created) })}
        </div>
      </div>
      <Button
        variant="Dark"
        size="xs"
        isLoading={downloading}
        leftIcon={<DownloadIcon />}
        onClick={() => downloadDocument(identifier)}
      />
    </div>
  );
};
