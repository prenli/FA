//TODO: ask for designs
import { useTranslation } from "react-i18next";

export const NoHoldings = () => {
  const { t } = useTranslation();
  return <div className="text-lg">{t("holdingsPage.noHoldings")}</div>;
};
