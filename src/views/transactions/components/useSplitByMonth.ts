import { useMemo } from "react";
import { Transaction as TransactionType } from "api/transactions/types";
import { useTranslation } from "react-i18next";
import { dateFromYYYYMMDD } from "../../../utils/date";

export const useSplitByMonth = (data: TransactionType[]) => {
  const { t } = useTranslation();
  return useMemo(() => {
    const splitData: {
      [key: string]: TransactionType[];
    } = {};
    data.forEach((transaction) => {
      const transactionDate = dateFromYYYYMMDD(transaction.transactionDate);
      const transactionDateLabel = getYearMonthLabel(transactionDate);

      if (!splitData[transactionDateLabel]) {
        splitData[transactionDateLabel] = [];
      }
      splitData[transactionDateLabel].push(transaction);
    });
    return Object.entries(splitData)
      .sort(([dateA], [dateB]) => (dateA < dateB ? 1 : -1))
      .map(([date, transactions]) => ({
        label: t("date", {
          date: dateFromYYYYMMDD(date),
          year: "numeric",
          month: "long",
        }),
        transactions: transactions,
      }));
  }, [data, t]);
};

const getYearMonthLabel = (date: Date) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;
