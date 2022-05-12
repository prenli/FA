import { HTMLAttributes } from "react";
import { ReactComponent as LinkIcon } from "assets/external-link.svg";

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
    <div className="flex justify-between text-primary-600">
      <div className="text-base font-semibold">{label}</div>
      <LinkIcon className="stroke-primary-600" />
    </div>
  </a>
);
