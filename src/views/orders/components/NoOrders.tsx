import { ErrorMessage } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

interface NoOrdersProps {
  startDate: Date;
  endDate: Date;
}

export const NoOrders = ({ startDate, endDate }: NoOrdersProps) => {
  const { t } = useModifiedTranslation();
  return (
    <ErrorMessage header={t("ordersPage.noOrders")}>
      <div className="mb-4">
        <span>{t("date", { date: startDate })}</span> -{" "}
        <span>{t("date", { date: endDate })}</span>
      </div>
      {t("ordersPage.noOrdersInfo")}
    </ErrorMessage>
  );
};
