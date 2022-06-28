import { ErrorMessage } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

export const NoOnboardingProcess = () => {
  const { t } = useModifiedTranslation();
  return (
    <ErrorMessage
      header={t("missingLinkedContactPage.noOnboardingProcessHeader")}
    >
      {t("missingLinkedContactPage.noOnboardingProcessMessage")}
    </ErrorMessage>
  );
};
