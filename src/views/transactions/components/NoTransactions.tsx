import { EmptyComponent } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

interface NoTransactionsProps {
  startDate: Date;
  endDate: Date;
}

export const NoTransactions = ({ startDate, endDate }: NoTransactionsProps) => {
  const { t } = useModifiedTranslation();
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
