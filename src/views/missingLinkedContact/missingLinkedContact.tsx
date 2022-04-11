import { ErrorMessage } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useNavigate } from "react-router";

export const MissingLinkedContact = () => {
  const { t } = useModifiedTranslation();
  const navigate = useNavigate();

  return (
    <ErrorMessage header={t("missingLinkedContact.missingLinkedContact")}>
      <div className="mb-2">
        {t("missingLinkedContact.followOnboardingInstructions")}
      </div>
      <div
        onClick={() =>
          navigate("/form/onboarding_2", {
            state: { header: "Client onboarding" },
          })
        }
        className="font-semibold text-primary-500 cursor-pointer"
      >
        {t("missingLinkedContact.startOnboarding")}
      </div>
    </ErrorMessage>
  );
};
