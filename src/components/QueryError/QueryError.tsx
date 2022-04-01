import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const QueryError = () => {
  const { t } = useModifiedTranslation();
  return (
    <ErrorMessage header={t("messages.queryError")}>
      {t("messages.problemResolveInstructions")}
    </ErrorMessage>
  );
};
