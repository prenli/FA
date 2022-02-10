import { ReactComponent as LinkIcon } from "assets/external-link.svg";

interface DocumentRowProps {
  label: string;
  url: string;
}

export const DocumentRow = ({ label, url }: DocumentRowProps) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <div className="flex justify-between pt-3 pb-2 text-blue-600">
      <div className="text-base font-semibold">{label}</div>
      <LinkIcon className="stroke-blue-600" />
    </div>
  </a>
);
