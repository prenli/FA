import { Badge, Grid } from "components";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { dateFromYYYYMMDD } from "utils/date";
import { getGridColsClass } from "utils/tailwindClasses";
import {
  getNameFromBackendTranslations,
  getTransactionColor,
} from "utils/transactions";
import { getNavigationPath } from "../../transactionDetails/transactionDetailsView";
import { TransactionProps, TransactionsListProps } from "./TransactionsGroup";

export const TransactionsListWithOneLineRow = ({
  transactions,
  type,
}: TransactionsListProps) => {
  const { portfolioId } = useParams();
  const showPortfolioLabel = !portfolioId;
  const { t } = useModifiedTranslation();
  const navigate = useNavigate();

  const isLgVersion = useMatchesBreakpoint("lg");

  const headersList = [
    t("transactionsPage.security"),
    ...(showPortfolioLabel ? [t("transactionsPage.portfolioName")] : []),
    t("transactionsPage.transactionDate"),
    ...(isLgVersion ? [t("transactionsPage.units")] : []),
    t("transactionsPage.type"),
    t("transactionsPage.tradeAmount"),
  ];

  return (
    <div className={`grid ${getGridColsClass(headersList.length + 1)}`}>
      <Grid.Header>
        {headersList.map((header, index) => {
          if (index === 0) {
            return (
              <span key={index} className="col-span-2">
                {header}
              </span>
            );
          }
          if (index === headersList.length - 2) {
            return (
              <div>
                <div className="mx-auto w-max">{header}</div>
              </div>
            );
          }
          return <span key={index}>{header}</span>;
        })}
      </Grid.Header>
      {transactions.map((transaction) => (
        <Transaction
          {...transaction}
          key={transaction.id}
          showPortfolioLabel={showPortfolioLabel}
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
  amount,
  type: { typeName, cashFlowEffect, amountEffect, typeNamesAsMap },
  tradeAmountInPortfolioCurrency,
  securityName,
  parentPortfolio,
  onClick,
  showPortfolioLabel,
}: TransactionProps) => {
  const { t, i18n } = useModifiedTranslation();

  const isLgVersion = useMatchesBreakpoint("lg");

  return (
    <>
      <Grid.Row key={id} className="py-2 border-t" onClick={onClick}>
        <div className="col-span-2 text-base font-semibold">{securityName}</div>
        {showPortfolioLabel && (
          <div className="text-sm md:text-base text-gray-500">
            {parentPortfolio.name}
          </div>
        )}
        <div className="text-sm md:text-base font-medium text-gray-500">
          <span>{t("date", { date: dateFromYYYYMMDD(transactionDate) })}</span>
        </div>
        {isLgVersion && (
          <div className="text-base font-medium">
            {t("number", { value: amount })}
          </div>
        )}
        <div>
          <div className="mx-auto w-max">
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
        <div className="relative text-base font-medium">
          <div className="absolute right-0">
            {t("numberWithCurrency", {
              value: tradeAmountInPortfolioCurrency,
              currency: parentPortfolio.currency.securityCode,
            })}
          </div>
        </div>
      </Grid.Row>
    </>
  );
};