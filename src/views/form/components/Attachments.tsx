import { ReactComponent as DownloadIcon } from "assets/download.svg";
import { Button, Card } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { downloadFileFromUrl } from "utils/file";
import { Attachment } from "../useProcessExecutor";

interface AttachmentsProps {
  attachments: Attachment[];
}

export const Attachments = ({ attachments }: AttachmentsProps) => {
  const { t } = useModifiedTranslation();
  return (
    <Card header={t("formPage.attachments")}>
      <div className="px-3">
        {attachments.map(({ name, url }) => (
          <div
            className="flex gap-2 justify-between items-center py-2"
            key={name}
          >
            <div className="overflow-hidden ">
              <div className="text-base font-semibold truncate">{name}</div>
            </div>
            <Button
              variant="Dark"
              size="xs"
              LeftIcon={DownloadIcon}
              onClick={() => downloadFileFromUrl(url, name)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
