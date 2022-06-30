import { HTMLAttributes } from "react";
import { ReactComponent as FileIcon } from "assets/document-text.svg";

interface DownloadableDocumentProps extends HTMLAttributes<HTMLAnchorElement> {
  label: string;
  url: string;
}

export const DownloadableDocument = ({
  label,
  url,
  ...anchorAttributes
}: DownloadableDocumentProps) => (
  <a target="_blank" rel="noopener noreferrer" {...anchorAttributes} href={url}>
    <div className="flex justify-between text-primary-600 stroke-primary-600">
      <div className="text-base font-semibold">{label}</div>
      <FileIcon className="w-6 h-6 stroke-primary-600" />
    </div>
  </a>
);
