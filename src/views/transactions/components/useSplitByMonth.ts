import { useMemo } from "react";
import { Transaction as TransactionType } from "api/transactions/types";
import { useTranslation } from "react-i18next";

export const useSplitByMonth = (data: TransactionType[]) => {
  const { t } = useTranslation();
  return useMemo(() => {
    const splitData: {
      [key: string]: TransactionType[];
    } = {};
    data.forEach((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
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
          date: new Date(date),
          year: "numeric",
          month: "long",
        }),
        transactions: transactions,
      }));
  }, [data, t]);
};

const getYearMonthLabel = (date: Date) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;
