import { ErrorMessage } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

export const NoHoldings = () => {
  const { t } = useModifiedTranslation();
  return (
    <ErrorMessage header={t("holdingsPage.noHoldings")}>
      {t("messages.problemResolveInstructions")}
    </ErrorMessage>
  );
};
