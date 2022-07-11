import { useState } from "react";
import { saveAs } from "file-saver";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { toast } from "react-toastify";
import { useGetDocumentData } from "./useGetDocumentData";

export const useDownloadDocument = () => {
  const { t } = useModifiedTranslation();
  const { getDocumentData } = useGetDocumentData();
  const [downloading, setDownloading] = useState(false);

  const downloadDocument = async (identifier: string) => {
    setDownloading(true);
    const documentQueryResolvedPromise = await getDocumentData(identifier);
    if (documentQueryResolvedPromise.data) {
      const documentData = documentQueryResolvedPromise.data.document;
      if (documentData.url) {
        const res = await fetch(documentData.url);
        const blob = await res.blob();
        saveAs(blob, documentData.fileName);
      }
    }
    if (documentQueryResolvedPromise.error) {
      toast.error(
        documentQueryResolvedPromise.error.message || t("messages.error")
      );
    }
    setDownloading(false);
  };

  return { downloadDocument, downloading };
};
