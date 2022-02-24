import { useDownloadDocument } from "api/documents/useDownloadDocument";
import { TransactionDetails as TransactionDetailsType } from "api/transactions/types";
import { ReactComponent as DocumentDownloadIcon } from "assets/document-download.svg";
import { Button, Card } from "components";
import { PageLayout } from "layouts/PageLayout/PageLayout";
import { InfoCard } from "pages/transactions/components/InfoCard";
import { useTranslation } from "react-i18next";
import { dateFromYYYYMMDD } from "utils/date";
import {
  getTransactionColor,
  getTransactionTypeName,
} from "utils/transactions";
import { DataRow } from "../holdingDetails/components/DataRow";

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
  return (
    <PageLayout>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <InfoCard
              label={t("transactionsPage.type")}
              value={getTransactionTypeName(
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
          </div>
          <InfoCard
            label={t("transactionsPage.securityName")}
            value={securityName}
          />
          <InfoCard
            label={t("transactionsPage.portfolioName")}
            value={portfolioName}
          />
          <div className="grid grid-cols-2 gap-2">
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
        </div>
        <Card header={t("transactionsPage.details")}>
          <div className="flex flex-col px-2 my-1 divide-y">
            <DataRow
              label={t("transactionsPage.units")}
              value={t("number", { value: amount })}
            />
            <DataRow
              label={t("transactionsPage.unitPrice")}
              value={t("numberWithCurrency", { value: unitPrice, currency })}
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
              value={t("numberWithCurrency", { value: tradeAmount, currency })}
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
        {extInfo && (
          <Card header={t("transactionsPage.description")}>
            <p className="p-2 text-base font-normal">{extInfo}</p>
          </Card>
        )}
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
        {documents.length > 0 && (
          <Button
            isFullWidth
            isLoading={downloading}
            LeftIcon={DocumentDownloadIcon}
            onClick={() => downloadDocument(documents[0].identifier)}
          >
            Download transaction note
          </Button>
        )}
      </div>
    </PageLayout>
  );
};
