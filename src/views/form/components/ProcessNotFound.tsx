import { ErrorMessage } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

export const ProcessNotFound = () => {
  const { t } = useModifiedTranslation();

  return (
    <ErrorMessage header={t("formPage.processNotFound")}>
      {t("formPage.processNotFoundInfo")}
    </ErrorMessage>
  );
};
