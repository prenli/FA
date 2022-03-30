import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";

export const QueryError = () => {
  const { t } = useModifiedTranslation();
  return (
    <EmptyComponent header={t("messages.queryError")}>
      {t("messages.problemResolveInstructions")}
    </EmptyComponent>
  );
};
