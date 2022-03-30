import { useState } from "react";
import { saveAs } from "file-saver";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { toast, Slide } from "react-toastify";
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
        documentQueryResolvedPromise.error.message || t("messages.error"),
        {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        }
      );
    }
    setDownloading(false);
  };

  return { downloadDocument, downloading };
};
