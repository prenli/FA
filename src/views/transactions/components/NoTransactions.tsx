import { EmptyComponent } from "components";
import { useTranslation } from "react-i18next";

interface NoTransactionsProps {
  startDate: Date;
  endDate: Date;
}

export const NoTransactions = ({ startDate, endDate }: NoTransactionsProps) => {
  const { t } = useTranslation();
  return (
    <EmptyComponent header={t("transactionsPage.noTransactions")}>
      <div className="mb-4">
        <span>{t("date", { date: startDate })}</span> -{" "}
        <span>{t("date", { date: endDate })}</span>
      </div>
      {t("transactionsPage.noTransactionsInfo")}
    </EmptyComponent>
  );
};
