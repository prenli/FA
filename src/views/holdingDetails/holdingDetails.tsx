import { HoldingPosition, SecurityDetailsPosition } from "api/holdings/types";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import {
  BackNavigationButton,
  Card,
  GainLoseColoring,
  Heading,
  LineChart,
} from "components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getTransactionTypeName } from "utils/transactions";
import { addProtocolToUrl } from "utils/url";
import { DataRow } from "./components/DataRow";
import { DocumentRow } from "./components/DocumentRow";
import { HoldingHeader } from "./components/HoldingHeader";
import { LineChartHeader } from "./components/LineChartHeader";

interface HoldingDetailsProps {
  data: Omit<HoldingPosition, "security"> & {
    security: SecurityDetailsPosition;
  };
}

export const HoldingDetails = ({
  data: {
    amount,
    purchaseTradeAmount,
    accruedInterest,
    marketValue,
    valueChangeRelative,
    valueChangeAbsolute,
    security: {
      name,
      isinCode,
      type: { namesAsMap, code: typeCode },
      latestMarketData: { close, obsDate },
      marketDataHistory,
      currency: { securityCode: currency },
      url,
      url2,
    },
  },
}: HoldingDetailsProps) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { data: { portfoliosCurrency } = { portfoliosCurrency: "EUR" } } =
    useGetContactInfo();

  return (
    <div className="flex overflow-hidden flex-col h-full">
      <Heading>
        <BackNavigationButton onClick={() => navigate(-1)} />
        {name ?? ""}
      </Heading>
      <div className="overflow-y-scroll grow-1">
        <div className="flex overflow-y-auto flex-col gap-4 my-4 mx-2">
          <Card
            header={
              <LineChartHeader
                price={close}
                date={obsDate}
                currency={portfoliosCurrency}
              />
            }
          >
            <div className="my-2">
              <LineChart
                series={[
                  {
                    name: "Price",
                    data: marketDataHistory.map((data) => data.price),
                  },
                ]}
                labels={marketDataHistory.map((data) =>
                  t("date", { date: new Date(data.date) })
                )}
              />
            </div>
          </Card>
          <Card
            header={
              <HoldingHeader
                currency={portfoliosCurrency}
                marketValue={marketValue}
              />
            }
          >
            <div className="flex flex-col px-2 my-1 divide-y">
              <DataRow
                label={t("holdingsPage.units")}
                value={t("number", { value: amount })}
              />
              <DataRow
                label={t("holdingsPage.purchaseValue")}
                value={t("numberWithCurrency", {
                  value: purchaseTradeAmount,
                  currency: portfoliosCurrency,
                })}
              />
              <DataRow
                label={t("holdingsPage.accruedInterest")}
                value={t("numberWithCurrency", {
                  value: accruedInterest,
                  currency: portfoliosCurrency,
                })}
              />
              <DataRow
                label={t("holdingsPage.marketValue")}
                value={t("numberWithCurrency", {
                  value: marketValue,
                  currency: portfoliosCurrency,
                })}
              />
              <DataRow
                label={t("holdingsPage.changePercentage")}
                value={
                  <GainLoseColoring value={valueChangeRelative}>
                    {`${t("number", {
                      value: valueChangeRelative,
                      formatParams: {
                        value: {
                          signDisplay: "always",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      },
                    })} %`}
                  </GainLoseColoring>
                }
              />
              <DataRow
                label={t("holdingsPage.unrealizedProfits")}
                value={
                  <GainLoseColoring value={valueChangeRelative}>
                    {t("numberWithCurrency", {
                      value: valueChangeAbsolute,
                      currency: portfoliosCurrency,
                      formatParams: {
                        value: {
                          signDisplay: "always",
                        },
                      },
                    })}
                  </GainLoseColoring>
                }
              />
            </div>
          </Card>
          <Card header={t("holdingsPage.security")}>
            <div className="flex flex-col px-2 my-1 divide-y">
              <DataRow
                label={t("holdingsPage.type")}
                value={getTransactionTypeName(
                  namesAsMap,
                  typeCode,
                  i18n.language
                )}
              />
              <DataRow label={t("holdingsPage.isinCode")} value={isinCode} />
              <DataRow label={t("holdingsPage.currency")} value={currency} />
              {url && (
                <DocumentRow
                  label={t("holdingsPage.prospectus")}
                  url={addProtocolToUrl(url)}
                />
              )}
              {url2 && (
                <DocumentRow
                  label={t("holdingsPage.kiid")}
                  url={addProtocolToUrl(url2)}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
