import { ErrorMessage } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

interface ApiErrorProps {
  resetApiError: () => void;
}

export const ApiError = ({ resetApiError }: ApiErrorProps) => {
  const { t } = useModifiedTranslation();

  return (
    <ErrorMessage header={t("formPage.submitError")}>
      {t("formPage.submitErrorInstructions")}
      <div
        onClick={resetApiError}
        className="font-semibold text-primary-500 cursor-pointer"
      >
        {t("formPage.goBack")}
      </div>
    </ErrorMessage>
  );
};
