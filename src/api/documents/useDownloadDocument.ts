import { useState } from "react";
import { saveAs } from "file-saver";
import { useGetDocumentData } from "./useGetDocumentData";

// TODO: handle errors
export const useDownloadDocument = () => {
  const { getDocumentData } = useGetDocumentData();
  const [downloading, setDownloading] = useState(false);

  const downloadDocument = async (identifier: string) => {
    setDownloading(true);
    const documentQueryResolvedPromise = await getDocumentData(identifier);
    if (documentQueryResolvedPromise.data) {
      const documentData = documentQueryResolvedPromise.data.document;
      const res = await fetch(documentData.url);
      const blob = await res.blob();
      saveAs(blob, documentData.fileName);
    }
    setDownloading(false);
  };

  return { downloadDocument, downloading };
};
