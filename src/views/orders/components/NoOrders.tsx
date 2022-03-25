import { EmptyComponent } from "components";
import { useTranslation } from "react-i18next";

interface NoOrdersProps {
  startDate: Date;
  endDate: Date;
}

export const NoOrders = ({ startDate, endDate }: NoOrdersProps) => {
  const { t } = useTranslation();
  return (
    <EmptyComponent header={t("ordersPage.noOrders")}>
      <div className="mb-4">
        <span>{t("date", { date: startDate })}</span> -{" "}
        <span>{t("date", { date: endDate })}</span>
      </div>
      {t("ordersPage.noOrdersInfo")}
    </EmptyComponent>
  );
};
