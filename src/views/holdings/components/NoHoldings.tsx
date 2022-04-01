import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { ErrorMessage } from "../../../components";

export const NoHoldings = () => {
  const { t } = useModifiedTranslation();
  return (
    <ErrorMessage header={t("holdingsPage.noHoldings")}>
      {t("messages.problemResolveInstructions")}
    </ErrorMessage>
  );
};
