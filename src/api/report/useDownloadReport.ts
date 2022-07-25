import { useState } from "react";
import { saveAs } from "file-saver";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { toast } from "react-toastify";
import { useGetReportData } from "./useGetReportData";

export const useDownloadReport = () => {
  const { t } = useModifiedTranslation();
  const { getReportData } = useGetReportData();
  const [downloading, setDownloading] = useState(false);

  const downloadReport = async (transactionId: string, language: string) => {
    setDownloading(true);
    const reportQueryResolvedPromise = await getReportData(
      transactionId,
      language
    );
    if (reportQueryResolvedPromise.data) {
      const documentData = reportQueryResolvedPromise.data.report;
      saveAs(
        "data:application/pdf;base64," + documentData,
        `Transaction_confirmation_${transactionId}`
      );
    }
    if (reportQueryResolvedPromise.error) {
      toast.error(
        reportQueryResolvedPromise.error.message || t("messages.error")
      );
    }
    setDownloading(false);
  };

  return { downloadReport, downloading };
};
