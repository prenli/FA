import { ErrorMessage } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

export const FormNotFound = () => {
  const { t } = useModifiedTranslation();

  return (
    <ErrorMessage header={t("formPage.formNotFound")}>
      {t("formPage.formNotFoundInfo")}
    </ErrorMessage>
  );
};
