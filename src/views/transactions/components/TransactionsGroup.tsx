import { TradeOrder } from "api/orders/types";
import { Transaction } from "api/transactions/types";
import { Badge, Card, ResponsiveDataGrid } from "components";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { dateFromYYYYMMDD } from "utils/date";
import {
  getTransactionColor,
  getNameFromBackendTranslations,
} from "utils/transactions";
import {
  getNavigationPath,
  TransactionType,
} from "../../transactionDetails/transactionDetailsView";

interface TransactionsGroupProps {
  label: string;
  transactions: TradeOrder[] | Transaction[];
  type: TransactionType;
}

export const TransactionsGroup = ({
  label,
  transactions,
  type,
}: TransactionsGroupProps) => {
  const { portfolioId } = useParams();
  const showPortfolioLabel = !portfolioId;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isMdVersion = useMatchesBreakpoint("md");
  const isLgVersion = useMatchesBreakpoint("lg");

  return (
    <div className="flex flex-col gap-4">
      <Card key={label} header={label}>
        <ResponsiveDataGrid
          headerLabels={
            isMdVersion
              ? [
                  t("transactionsPage.security"),
                  t("transactionsPage.type"),
                  ...(showPortfolioLabel
                    ? [t("transactionsPage.portfolioName")]
                    : []),
                  t("transactionsPage.transactionDate"),
                  ...(isLgVersion ? [t("transactionsPage.units")] : []),
                  t("transactionsPage.tradeAmount"),
                ]
              : []
          }
        >
          {transactions.map((transaction) => {
            const {
              id,
              amount,
              transactionDate,
              type: { typeName, cashFlowEffect, amountEffect, typeNamesAsMap },
              tradeAmountInPortfolioCurrency,
              securityName,
              parentPortfolio,
            } = transaction;

            return (
              <ResponsiveDataGrid.Row
                flexOrder={[0, 3, 2, 1]}
                key={id}
                onClick={() => navigate(`${getNavigationPath(type)}/${id}`)}
              >
                <div className="text-base font-semibold">{securityName}</div>
                <div className="float-right w-max text-center">
                  <Badge
                    colorScheme={getTransactionColor(
                      amountEffect,
                      cashFlowEffect
                    )}
                  >
                    {getNameFromBackendTranslations(
                      typeNamesAsMap,
                      typeName.toLowerCase(),
                      i18n.language
                    )}
                  </Badge>
                </div>
                {isMdVersion && showPortfolioLabel && (
                  <div className="text-sm md:text-base text-gray-500">
                    {parentPortfolio.name}
                  </div>
                )}
                <div className="text-sm md:text-base font-semibold text-gray-500">
                  <span>
                    {t("date", { date: dateFromYYYYMMDD(transactionDate) })}
                  </span>
                  {!isMdVersion && showPortfolioLabel && (
                    <span>{` - ${parentPortfolio.name}`}</span>
                  )}
                </div>
                {isLgVersion && (
                  <div className="text-base font-medium">
                    {t("number", { value: amount })}
                  </div>
                )}
                <div className="text-base font-medium">
                  {t("numberWithCurrency", {
                    value: tradeAmountInPortfolioCurrency,
                    currency: parentPortfolio.currency.securityCode,
                  })}
                </div>
              </ResponsiveDataGrid.Row>
            );
          })}
        </ResponsiveDataGrid>
      </Card>
    </div>
  );
};
