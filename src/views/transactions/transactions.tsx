import React, { Dispatch, SetStateAction } from "react";
import { ApolloError } from "@apollo/client";
import { Transaction as TransactionType } from "api/types";
import { DatePicker, QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { TransactionsContainer } from "./TransactionsContainer/TransactionsContainer";

interface TransactionsProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  error: ApolloError | undefined;
  data: TransactionType[] | undefined;
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
    <div className="flex flex-col gap-4 mx-2 ">
      <div className="flex gap-2 text-normal">
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
      <QueryLoadingWrapper
        {...queryData}
        SuccessComponent={TransactionsContainer}
      />
    </div>
  );
};
