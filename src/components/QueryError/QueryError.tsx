import { useTranslation } from "react-i18next";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";

export const QueryError = () => {
  const { t } = useTranslation();
  return (
    <EmptyComponent header={t("messages.queryError")}>
      {t("messages.problemResolveInstructions")}
    </EmptyComponent>
  );
};
