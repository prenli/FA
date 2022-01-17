import { useMemo } from "react";
import { Transaction as TransactionType } from "api/types";
import { useTranslation } from "react-i18next";
import { formatToLocalDate } from "utils/date";

export const useSplitByMonth = (data: TransactionType[]) => {
  const { i18n } = useTranslation();
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
      .sort((entryA, entryB) => (entryA[0] < entryB[0] ? 1 : -1))
      .map((entry) => ({
        label: formatToLocalDate(
          new Date(entry[0]),
          {
            year: "numeric",
            month: "long",
          },
          i18n.language
        ),
        transactions: entry[1],
      }));
  }, [data, i18n.language]);
};

const getYearMonthLabel = (date: Date) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;
