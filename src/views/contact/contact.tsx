import { Card } from "components";
import { useTranslation } from "react-i18next";
import { useGetContactHTML } from "./useGetContactHTML";

export const ContactView = () => {
  const contactHTML = useGetContactHTML();
  const { t } = useTranslation();

  return (
    <Card header={t("contactPage.cardHeader")}>
      <div dangerouslySetInnerHTML={{ __html: contactHTML }} />
    </Card>
  );
};
