import React, { ReactNode } from "react";
import { TransactionDetails as TransactionDetailsType } from "api/transactions/types";
import { Button } from "components";
import { useTranslation } from "react-i18next";
import { getTransactionTypeName } from "utils/transactions";

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
    type: { typeName, typeNamesAsMap },
    transactionDate,
    securityName,
    parentPortfolio: { name: portfolioName },
    totalCost,
    tradeAmount,
    currencyCode: currency,
  },
}: TransactionDetailsProps) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col p-6 h-full">
      <div className="grid flex-1 grid-cols-2 gap-4 content-start">
        <LabeledDiv label="Security name">{securityName}</LabeledDiv>
        <LabeledDiv label="Portfolio name">{portfolioName}</LabeledDiv>
        <LabeledDiv label="Units">{amount}</LabeledDiv>
        <LabeledDiv label="Unit price">
          {t("numberWithCurrency", { value: unitPrice, currency })}
        </LabeledDiv>
        <LabeledDiv label="Gross trade amount">
          {t("numberWithCurrency", { value: grossPrice, currency })}
        </LabeledDiv>
        <LabeledDiv label="Cost">
          {t("numberWithCurrency", { value: totalCost, currency })}
        </LabeledDiv>
        <LabeledDiv label="Net trade amount">
          {t("numberWithCurrency", { value: tradeAmount, currency })}
        </LabeledDiv>
        <LabeledDiv label="Type">
          {getTransactionTypeName(typeNamesAsMap, typeName, i18n.language)}
        </LabeledDiv>
        <LabeledDiv label="ISIN code">
          {security?.isinCode ?? t("messages.notAvailable")}
        </LabeledDiv>
        <div />
        <LabeledDiv label="Transaction date">
          {t("date", { date: new Date(transactionDate) })}
        </LabeledDiv>
        <LabeledDiv label="Settlement date">
          {settlementDate
            ? t("date", { date: new Date(settlementDate) })
            : t("messages.notAvailable")}
        </LabeledDiv>
      </div>
      <Button variant="Secondary" isFullWidth>
        Download transaction note
      </Button>
    </div>
  );
};

interface LabeledDivProps {
  label: ReactNode;
  children: ReactNode;
}

const LabeledDiv = ({ label, children }: LabeledDivProps) => (
  <div className="leading-none">
    <label className="text-sm">{label}</label>
    <div className="font-bold">{children}</div>
  </div>
);
