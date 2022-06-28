import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const NoPortfolios = () => {
  const { t } = useModifiedTranslation();
  return (
    <ErrorMessage header={t("messages.noPortfolios")}>
      {t("messages.noPortfoliosInfo")}
    </ErrorMessage>
  );
};
