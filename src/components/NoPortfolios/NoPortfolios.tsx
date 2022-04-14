import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface NoPortfoliosProps {
  contactId: number | undefined;
}

export const NoPortfolios = ({ contactId }: NoPortfoliosProps) => {
  const { t } = useModifiedTranslation();
  return (
    <ErrorMessage header={t("messages.noPortfolios")}>
      <div className="font-semibold">{`Contact ID: ${contactId}`}</div>
      {t("messages.problemResolveInstructions")}
    </ErrorMessage>
  );
};
