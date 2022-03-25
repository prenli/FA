import { useTranslation } from "react-i18next";
import { EmptyComponent } from "../../../components";

export const NoHoldings = () => {
  const { t } = useTranslation();
  return (
    <EmptyComponent header={t("holdingsPage.noHoldings")}>
      {t("messages.problemResolveInstructions")}
    </EmptyComponent>
  );
};
