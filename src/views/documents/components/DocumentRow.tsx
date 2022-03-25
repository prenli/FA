import { Document } from "api/documents/types";
import { ReactComponent as DownloadIcon } from "assets/download.svg";
import { Button } from "components";
import { useTranslation } from "react-i18next";
import { dateFromYYYYMMDD } from "utils/date";
import { useDownloadDocument } from "../../../api/documents/useDownloadDocument";
import { useMatchesBreakpoint } from "../../../hooks/useMatchesBreakpoint";

type DocumentRowProps = Document;

export const DocumentRow = ({
  identifier,
  fileName,
  created,
}: DocumentRowProps) => {
  const { t } = useTranslation();
  const { downloadDocument, downloading } = useDownloadDocument();
  const isGrid = useMatchesBreakpoint("md");

  if (!isGrid) {
    return (
      <div className="flex gap-2 justify-between items-center py-2">
        <div className="overflow-hidden ">
          <div className="text-base font-semibold truncate">{fileName}</div>
          <div className="text-sm font-semibold text-gray-500">
            {t("date", { date: dateFromYYYYMMDD(created) })}
          </div>
        </div>
        <Button
          variant="Dark"
          size="xs"
          isLoading={downloading}
          LeftIcon={DownloadIcon}
          onClick={() => downloadDocument(identifier)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="pt-2 pb-2.5 ml-2 text-base md:text-lg font-semibold md:leading-8 truncate">
        {fileName}
      </div>
      <div className="pt-2 pb-2.5 text-sm font-semibold md:leading-8 text-right text-gray-500 md:text-gray-800">
        {t("date", { date: dateFromYYYYMMDD(created) })}
      </div>
      <div className="pt-2 pb-2.5 mr-2 text-right">
        <Button
          variant="Dark"
          size="xs"
          isLoading={downloading}
          LeftIcon={DownloadIcon}
          onClick={() => downloadDocument(identifier)}
        />
      </div>
    </>
  );
};
