import { useTranslation } from "react-i18next";

export const NoOrders = () => {
  const { t } = useTranslation();
  return <div>{t("ordersPage.noOrders")}</div>;
};
