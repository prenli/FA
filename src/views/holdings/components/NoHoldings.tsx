import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { EmptyComponent } from "../../../components";

export const NoHoldings = () => {
  const { t } = useModifiedTranslation();
  return (
    <EmptyComponent header={t("holdingsPage.noHoldings")}>
      {t("messages.problemResolveInstructions")}
    </EmptyComponent>
  );
};
