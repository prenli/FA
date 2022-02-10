import { TradeOrder } from "api/orders/types";
import { useTranslation } from "react-i18next";
import {
  getTransactionColor,
  getTransactionTypeName,
} from "utils/transactions";
import { Badge } from "../../../components";

type Props = TradeOrder;

export const TradeOrderPosition: React.FC<Props> = ({
  securityName,
  tradeAmountInPortfolioCurrency,
  transactionDate,
  parentPortfolio,
  type: { typeNamesAsMap, typeName, amountEffect, cashFlowEffect },
}) => {
  const { i18n, t } = useTranslation();

  return (
    <div className="py-2">
      <div className="flex justify-between">
        <div className="text-base font-semibold">{securityName}</div>
        <div className="text-base font-medium">
          {t("numberWithCurrency", {
            value: tradeAmountInPortfolioCurrency,
            currency: parentPortfolio.currency.securityCode,
          })}
        </div>
      </div>
      <div className="flex justify-between text-xs">
        <div className="text-sm font-semibold text-gray-500">{`
        ${t("date", { date: new Date(transactionDate) })} - ${
          parentPortfolio.name
        }`}</div>
        <Badge colorScheme={getTransactionColor(amountEffect, cashFlowEffect)}>
          {getTransactionTypeName(typeNamesAsMap, typeName, i18n.language)}
        </Badge>
      </div>
    </div>
  );
};
