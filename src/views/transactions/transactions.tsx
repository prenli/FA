import { Dispatch, SetStateAction } from "react";
import { Transaction as TransactionType } from "api/transactions/types";
import { QueryData } from "api/types";
import { Card, DatePicker, QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { TransactionsContainer } from "./components/TransactionsContainer";

interface TransactionsProps extends QueryData<TransactionType[]> {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

export const Transactions = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  ...queryData
}: TransactionsProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex gap-2 justify-between p-2 text-normal">
          <DatePicker
            label={t("transactionsPage.datePickerFromLabel")}
            value={startDate}
            onChange={setStartDate}
            maxDate={endDate}
          />
          <DatePicker
            label={t("transactionsPage.datePickerFromTo")}
            value={endDate}
            onChange={setEndDate}
            minDate={startDate}
          />
        </div>
      </Card>
      <QueryLoadingWrapper
        {...queryData}
        SuccessComponent={TransactionsContainer}
      />
    </div>
  );
};
