import { useDownloadDocument } from "api/documents/useDownloadDocument";
import { TransactionDetails as TransactionDetailsType } from "api/transactions/types";
import { ReactComponent as DocumentDownloadIcon } from "assets/document-download.svg";
import { Button, Card, CountryFlag } from "components";
import { PageLayout } from "layouts/PageLayout/PageLayout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { dateFromYYYYMMDD } from "utils/date";
import {
  getTransactionColor,
  getNameFromBackendTranslations,
} from "utils/transactions";
import { InfoCard } from "views/transactionDetails/components/InfoCard";
import { DataRow } from "../../holdingDetails/components/DataRow";
import { TransactionType } from "../transactionDetailsView";

interface TransactionDetailsProps {
  data: TransactionDetailsType;
}

export const TransactionDetails = ({
  data: {
    amount,
    security,
    settlementDate,
    unitPrice,
    grossPrice,
    type: { typeName, typeNamesAsMap, cashFlowEffect, amountEffect },
    transactionDate,
    securityName,
    parentPortfolio: { name: portfolioName },
    totalCost,
    tradeAmount,
    currencyCode: currency,
    fxRate,
    marketPlace,
    documents,
    extInfo,
  },
}: TransactionDetailsProps) => {
  const { t, i18n } = useTranslation();
  const { downloadDocument, downloading } = useDownloadDocument();
  const transactionType = useGetTransactionType();
  const navigate = useNavigate();
  return (
    <PageLayout>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))]">
          <InfoCard
            label={t("transactionsPage.type")}
            value={getNameFromBackendTranslations(
              typeNamesAsMap,
              typeName,
              i18n.language
            )}
            colorScheme={getTransactionColor(amountEffect, cashFlowEffect)}
          />
          <InfoCard
            label={t("transactionsPage.total")}
            value={t("numberWithCurrency", { value: totalCost, currency })}
          />
          <div className="col-span-2 md:col-span-1">
            <InfoCard
              label={t("transactionsPage.securityName")}
              value={
                <div>
                  <span>{securityName}</span>
                  {security && security.country && (
                    <CountryFlag
                      code={security.country.code}
                      className="inline ml-1.5 align-baseline w-[20px] h-[14px]"
                    />
                  )}
                </div>
              }
              onClick={() =>
                !!security && navigate(`../holdings/${security.securityCode}`)
              }
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InfoCard
              label={t("transactionsPage.portfolioName")}
              value={portfolioName}
            />
          </div>
          <InfoCard
            label={t("transactionsPage.transactionDate")}
            value={t("date", { date: dateFromYYYYMMDD(transactionDate) })}
          />
          <InfoCard
            label={t("transactionsPage.settlementDate")}
            value={
              settlementDate
                ? t("date", { date: dateFromYYYYMMDD(settlementDate) })
                : t("messages.notAvailable")
            }
          />
        </div>
        <div className="grid xl:grid-cols-2 lg:col-span-2 md:row-span-3 gap-4 content-start">
          <Card header={t("transactionsPage.details")}>
            <div className="flex flex-col px-2 my-1 divide-y">
              <DataRow
                label={t("transactionsPage.units")}
                value={t("number", { value: amount })}
              />
              <DataRow
                label={t("transactionsPage.unitPrice")}
                value={t("numberWithCurrency", {
                  value: unitPrice,
                  currency,
                  formatParams: {
                    value: {
                      // do not round unit price to two decimals - business requirement
                      maximumFractionDigits: 10,
                    },
                  },
                })}
              />
              <DataRow
                label={t("transactionsPage.grossTradeAmount")}
                value={t("numberWithCurrency", { value: grossPrice, currency })}
              />
              <DataRow
                label={t("transactionsPage.cost")}
                value={t("numberWithCurrency", { value: totalCost, currency })}
              />
              <DataRow
                label={t("transactionsPage.netTradeAmount")}
                value={t("numberWithCurrency", {
                  value: tradeAmount,
                  currency,
                })}
              />
              <DataRow
                label={t("transactionsPage.fxRate")}
                value={t("number", {
                  value: fxRate,
                  formatParams: {
                    value: {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  },
                })}
              />
            </div>
          </Card>
          <div className="h-fit">
            <Card header={t("transactionsPage.security")}>
              <div className="flex flex-col px-2 my-1 divide-y">
                <DataRow
                  label={t("transactionsPage.isin")}
                  value={security?.isinCode ?? t("messages.notAvailable")}
                />
                <DataRow
                  label={t("transactionsPage.marketplace")}
                  value={
                    marketPlace?.name ??
                    security?.exchange?.name ??
                    t("messages.notAvailable")
                  }
                />
              </div>
            </Card>
          </div>
        </div>
        {extInfo && (
          <Card header={t("transactionsPage.description")}>
            <p className="p-2 text-base font-normal">{extInfo}</p>
          </Card>
        )}
        {documents.length > 0 && (
          <Button
            isFullWidth
            isLoading={downloading}
            LeftIcon={DocumentDownloadIcon}
            onClick={() => downloadDocument(documents[0].identifier)}
          >
            {transactionType === "transaction"
              ? t("transactionsPage.downloadFileButtonLabel")
              : t("ordersPage.downloadFileButtonLabel")}
          </Button>
        )}
      </div>
    </PageLayout>
  );
};

const useGetTransactionType = (): TransactionType => {
  const { transactionId } = useParams();

  if (transactionId) {
    return "transaction" as const;
  }
  return "order" as const;
};
