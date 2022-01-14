import React from "react";
import { TradeOrder } from "api/types";
import { useTranslation } from "react-i18next";
import { getTransactionTypeName } from "utils/transactions";

type Props = TradeOrder;

export const TradeOrderPosition: React.FC<Props> = ({
  securityName,
  tradeAmountInPortfolioCurrency,
  transactionDate,
  parentPortfolio,
  type: { typeNamesAsMap, typeName },
}) => {
  const { i18n } = useTranslation();
  const transationTypeName = getTransactionTypeName(
    typeNamesAsMap,
    typeName,
    i18n.language
  );

  return (
    <div className="p-2">
      <div className="flex flex-row justify-between pb-1 text-lg">
        <span>{securityName}</span>
        <span className="font-bold">{tradeAmountInPortfolioCurrency}</span>
      </div>
      <div className="flex flex-row justify-between text-sm">
        <div>
          <span>{transactionDate}</span> - <span>{parentPortfolio.name}</span>
        </div>
        <span>{transationTypeName}</span>
      </div>
    </div>
  );
};
