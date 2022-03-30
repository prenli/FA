import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";

export const NoPortfolios = () => {
  const { t } = useModifiedTranslation();
  return (
    <EmptyComponent header={t("messages.noPortfolios")}>
      {t("messages.problemResolveInstructions")}
    </EmptyComponent>
  );
};
