import { useTranslation } from "react-i18next";

export const NoTransactions = () => {
  const { t } = useTranslation();
  return <div>{t("transactionsPage.noTransactions")}</div>;
};
