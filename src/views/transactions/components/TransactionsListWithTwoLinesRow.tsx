import { Badge, Grid } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { dateFromYYYYMMDD } from "utils/date";
import {
  getNameFromBackendTranslations,
  getTransactionColor,
} from "utils/transactions";
import { getNavigationPath } from "../../transactionDetails/transactionDetailsView";
import { TransactionProps, TransactionsListProps } from "./TransactionsGroup";

export const TransactionsListWithTwoLinesRow = ({
  transactions,
  type,
}: TransactionsListProps) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 items-center">
      {transactions.map((transaction) => (
        <Transaction
          {...transaction}
          key={transaction.id}
          onClick={() =>
            navigate(`${getNavigationPath(type)}/${transaction.id}`)
          }
        />
      ))}
    </div>
  );
};

const Transaction = ({
  id,
  transactionDate,
  type: { typeName, cashFlowEffect, amountEffect, typeNamesAsMap },
  tradeAmountInPortfolioCurrency,
  securityName,
  parentPortfolio,
  onClick,
}: TransactionProps) => {
  const { t, i18n } = useModifiedTranslation();
  const { portfolioId } = useParams();
  const showPortfolioLabel = !portfolioId;

  return (
    <>
      <Grid.Row key={id} className="py-2 border-t" onClick={onClick}>
        <div className="col-span-2">
          <div className="flex gap-4 justify-between items-center text-left text-gray-800">
            <div className="text-base font-semibold">{securityName}</div>
            <div className="text-base font-medium">
              {t("numberWithCurrency", {
                value: tradeAmountInPortfolioCurrency,
                currency: parentPortfolio.currency.securityCode,
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm md:text-base font-semibold text-gray-500">
              <span>
                {t("date", { date: dateFromYYYYMMDD(transactionDate) })}
              </span>
              {showPortfolioLabel && (
                <span>{` - ${parentPortfolio.name}`}</span>
              )}
            </div>
            <div className="float-right w-max text-center">
              <Badge
                colorScheme={getTransactionColor(amountEffect, cashFlowEffect)}
              >
                {getNameFromBackendTranslations(
                  typeNamesAsMap,
                  typeName.toLowerCase(),
                  i18n.language
                )}
              </Badge>
            </div>
          </div>
        </div>
      </Grid.Row>
    </>
  );
};
