import { Card } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useGetContactHTML } from "./useGetContactHTML";

export const ContactView = () => {
  const contactHTML = useGetContactHTML();
  const { t } = useModifiedTranslation();

  return (
    <Card header={t("contactPage.cardHeader")}>
      <div dangerouslySetInnerHTML={{ __html: contactHTML }} />
    </Card>
  );
};
