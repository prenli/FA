import React from "react";
import { HoldingPosition, SecurityDetailsPosition } from "api/holdings/types";
import {
  BackNavigationButton,
  Button,
  Card,
  Heading,
  LabeledDiv,
} from "components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getTransactionTypeName } from "utils/transactions";
import { addProtocolToUrl } from "utils/url";
import { HoldingDetailsCard } from "./HoldingDetailsCard/HoldingDetailsCard";
import { LatestMarketPrice } from "./LatestMarketPrice/LatestMarketPrice";
import { SecurityDetailsCard } from "./SecurityDetailsCard/SecurityDetailsCard";

interface HoldingDetailsProps {
  data: Omit<HoldingPosition, "security"> & {
    security: SecurityDetailsPosition;
  };
}

export const HoldingDetails = ({ data }: HoldingDetailsProps) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const typeName = getTransactionTypeName(
    data.security.type.namesAsMap,
    data.security.type.code,
    i18n.language
  );
  const changePercentage = data.valueChangeRelative.toFixed(2);

  return (
    <div className="flex flex-col h-screen">
      <Heading>
        <BackNavigationButton onClick={() => navigate(-1)} />
        {data.security.name ?? ""}
      </Heading>
      <div className="flex flex-col justify-between m-4 h-full">
        <div className="grid gap-4">
          <LatestMarketPrice
            label={t("holdingsPage.latestMarketPrice")}
            value={data.security.latestMarketData.close}
            currency={data.security.currency.securityCode}
          />
          <div className="grid gap-4">
            <HoldingDetailsCard label={t("holdingsPage.holdings")}>
              <LabeledDiv label={t("holdingsPage.units")}>
                {data.amount}
              </LabeledDiv>
              <LabeledDiv label={t("holdingsPage.purchaseValue")}>
                {t("number", { value: data.purchaseTradeAmount })}
              </LabeledDiv>
              <LabeledDiv label={t("holdingsPage.accruedInterest")}>
                {t("number", { value: data.accruedInterest })}
              </LabeledDiv>
              <LabeledDiv label={t("holdingsPage.marketValue")}>
                {t("number", { value: data.marketValue })}
              </LabeledDiv>
              <LabeledDiv label={t("holdingsPage.changePercentage")}>
                {changePercentage}
              </LabeledDiv>
              <LabeledDiv label={t("holdingsPage.unrealizedProfits")}>
                {t("number", { value: data.valueChangeAbsolute })}
              </LabeledDiv>
            </HoldingDetailsCard>

            <SecurityDetailsCard label={t("holdingsPage.securityDetails")}>
              <LabeledDiv label={t("holdingsPage.type")}>{typeName}</LabeledDiv>
              <LabeledDiv label={t("holdingsPage.isinCode")}>
                {data.security.isinCode}
              </LabeledDiv>
              <LabeledDiv label={t("holdingsPage.currency")}>
                {data.security.currency.securityCode}
              </LabeledDiv>
            </SecurityDetailsCard>

            {data.security.url && (
              <Card>
                <a
                  className="flex justify-between p-2"
                  href={addProtocolToUrl(data.security.url)}
                >
                  <div>{t("holdingsPage.prospectus")}</div>
                </a>
              </Card>
            )}
            {data.security.url2 && (
              <Card>
                <a
                  className="flex justify-between p-2"
                  href={addProtocolToUrl(data.security.url2)}
                >
                  <div>{t("holdingsPage.kiid")}</div>
                </a>
              </Card>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button variant="Primary" isFullWidth>
            {t("holdingsPage.buy")}
          </Button>
          <Button variant="Secondary" isFullWidth>
            {t("holdingsPage.sell")}
          </Button>
        </div>
      </div>
    </div>
  );
};
