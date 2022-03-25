import { EmptyComponent } from "components/EmptyComponent/EmptyComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const NotFoundView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <EmptyComponent header={t("notFoundPage.title")}>
      {t("notFoundPage.info")}
      <div
        onClick={() => navigate(-1)}
        className="font-semibold text-primary-500"
      >
        {t("notFoundPage.return")}
      </div>
    </EmptyComponent>
  );
};
