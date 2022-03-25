import { useTranslation } from "react-i18next";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";

export const NoPortfolios = () => {
  const { t } = useTranslation();
  return (
    <EmptyComponent header={t("messages.noPortfolios")}>
      {t("messages.problemResolveInstructions")}
    </EmptyComponent>
  );
};
