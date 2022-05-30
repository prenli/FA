import { HoldingPosition, SecurityDetailsPosition } from "api/holdings/types";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { ReactComponent as MinusCircle } from "assets/minus-circle.svg";
import { ReactComponent as PlusCircle } from "assets/plus-circle.svg";
import {
  Card,
  GainLoseColoring,
  DetailsHeading,
  Button,
  BuyModalContent,
  SellModalContent,
} from "components";
import { BuyModalInitialData } from "components/BuyModalContent/BuyModalContent";
import { useModal } from "components/Modal/useModal";
import { SellModalInitialData } from "components/SellModalContent/SellModalContent";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { PageLayout } from "layouts/PageLayout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CanTrade } from "services/permissions/CanTrade";
import { getNameFromBackendTranslations } from "utils/transactions";
import { addProtocolToUrl } from "utils/url";
import { DataRow } from "./components/DataRow";
import { DocumentRow } from "./components/DocumentRow";
import { HoldingHeader } from "./components/HoldingHeader";
import { HoldingHistoryDataChart } from "./components/HoldingHistoryDataChart";
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
      latestMarketData,
      currency: { securityCode: currency },
      url,
      url2,
    },
  },
}: HoldingDetailsProps) => {
  const navigate = useNavigate();
  const { holdingId } = useParams();
  const { i18n, t } = useModifiedTranslation();
  const { data: { portfoliosCurrency } = { portfoliosCurrency: "EUR" } } =
    useGetContactInfo();

  const {
    Modal,
    onOpen: onBuyModalOpen,
    modalProps: buyModalProps,
    contentProps: buyModalContentProps,
  } = useModal<BuyModalInitialData>();

  const {
    onOpen: onSellModalOpen,
    modalProps: sellModalProps,
    contentProps: sellModalContentProps,
  } = useModal<SellModalInitialData>();

  return (
    <div className="flex overflow-hidden flex-col h-full">
      <DetailsHeading onBackButtonClick={() => navigate(-1)}>
        {name ?? ""}
      </DetailsHeading>
      <div className="overflow-y-auto grow-1">
        <PageLayout>
          <div className="grid gap-4 md:grid-cols-[300px_auto] lg:grid-cols-[400px_auto] xl:grid-cols-[500px_auto]">
            <div className="md:col-start-2 md:row-start-1 md:row-end-3">
              <Card
                header={
                  <LineChartHeader
                    price={latestMarketData?.price}
                    date={latestMarketData?.date}
                    currency={currency}
                  />
                }
              >
                <HoldingHistoryDataChart />
              </Card>
            </div>
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
                {typeCode === "BOND" && (
                  <DataRow
                    label={t("holdingsPage.accruedInterest")}
                    value={t("numberWithCurrency", {
                      value: accruedInterest,
                      currency: portfoliosCurrency,
                    })}
                  />
                )}
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
                        value: valueChangeRelative * 100,
                        formatParams: {
                          value: {
                            signDisplay: "always",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          },
                        },
                      })}%`}
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
            <div className="grid gap-4">
              <Card header={t("holdingsPage.security")}>
                <div className="flex flex-col px-2 my-1 capitalize divide-y">
                  <DataRow
                    label={t("holdingsPage.type")}
                    value={getNameFromBackendTranslations(
                      namesAsMap,
                      typeCode.toLowerCase(),
                      i18n.language
                    )}
                  />
                  <DataRow
                    label={t("holdingsPage.isinCode")}
                    value={isinCode}
                  />
                  <DataRow
                    label={t("holdingsPage.currency")}
                    value={currency}
                  />
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
              <CanTrade>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    LeftIcon={PlusCircle}
                    onClick={() =>
                      onBuyModalOpen({ holdingId, securityName: name, url2 })
                    }
                  >
                    {t("holdingsPage.buy")}
                  </Button>
                  <Button
                    LeftIcon={MinusCircle}
                    variant="Red"
                    onClick={() =>
                      onSellModalOpen({ holdingId, securityName: name, url2 })
                    }
                  >
                    {t("holdingsPage.sell")}
                  </Button>
                </div>
                <Modal
                  {...buyModalProps}
                  header={t("tradingModal.buyModalHeader")}
                >
                  <BuyModalContent {...buyModalContentProps} />
                </Modal>
                <Modal
                  {...sellModalProps}
                  header={t("tradingModal.sellModalHeader")}
                >
                  <SellModalContent {...sellModalContentProps} />
                </Modal>
              </CanTrade>
            </div>
          </div>
        </PageLayout>
      </div>
    </div>
  );
};
