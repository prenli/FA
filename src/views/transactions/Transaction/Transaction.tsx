import React from "react";
import { Transaction as TransactionType } from "api/transactions/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { formatToLocalShortDate } from "utils/date";
import { getTransactionTypeName } from "utils/transactions";
import { TransactionValue } from "../TransactionValue/TransactionValue";

type TransactionProps = TransactionType;
export const Transaction = ({
  id,
  transactionDate,
  type: { typeName, cashFlowEffect, typeNamesAsMap },
  tradeAmountInPortfolioCurrency,
  securityName,
  parentPortfolio,
}: TransactionProps) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col border-b cursor-pointer"
      onClick={() => navigate(`/transactions/${id}`)}
    >
      <div className="flex justify-between">
        <div className="">{securityName}</div>
        <TransactionValue
          value={tradeAmountInPortfolioCurrency}
          sign={cashFlowEffect}
        />
      </div>
      <div className="flex justify-between text-xs">
        <div className="">{`${formatToLocalShortDate(
          new Date(transactionDate),
          i18n.language
        )} - ${parentPortfolio.name}`}</div>
        <div className="">
          {getTransactionTypeName(typeNamesAsMap, typeName, i18n.language)}
        </div>
      </div>
    </div>
  );
};