import { MutableRefObject, useState } from "react";
import { SecurityTypeCode } from "api/holdings/types";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { useGetBuyData } from "api/trading/useGetBuyData";
import { useTrade } from "api/trading/useTrade";
import {
  PortfolioSelect,
  DownloadableDocument,
  Button,
  Input,
  LabeledDiv,
} from "components/index";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useTradablePortfolioSelect } from "../useTradablePortfolioSelect";

export interface BuyModalInitialData {
  name: string;
  url2?: string;
  currency: {
    securityCode: string;
  };
  securityCode: string;
  type?: {
    code: SecurityTypeCode;
  };
  latestMarketData?: {
    price: number;
  };
  fxRate: number;
}

interface BuyModalProps extends BuyModalInitialData {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
}

// buying non-Collective investment should be defined in units instead of trade amount
const isTransactionAmountDefinedAsUnits = (
  securityType: SecurityTypeCode | undefined
) => securityType !== "C";

const getTradeType = (securityType: SecurityTypeCode | undefined) =>
  isTransactionAmountDefinedAsUnits(securityType) ? "buy" : "subscription";

const getTradeAmount = (
  amount: number,
  securityType: SecurityTypeCode | undefined,
  price = 1,
  fxRate = 1
) =>
  isTransactionAmountDefinedAsUnits(securityType)
    ? amount * price * fxRate
    : amount;

const getTradeAmountArgs = (
  amount: number,
  securityType: SecurityTypeCode | undefined
) =>
  isTransactionAmountDefinedAsUnits(securityType)
    ? { units: amount }
    : { tradeAmount: amount };

export const BuyModalContent = ({
  modalInitialFocusRef,
  onClose,
  ...security
}: BuyModalProps) => {
  const {
    name: securityName,
    url2,
    type: { code: securityType } = {},
    latestMarketData,
    fxRate,
  } = security;
  const { t } = useModifiedTranslation();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();
  const { portfolioId, setPortfolioId, portfolioOptions } =
    useTradablePortfolioSelect();
  const {
    loading,
    data: { availableCash = 0, currency: portfolioCurrency = "EUR" } = {},
  } = useGetBuyData(portfolioId.toString());

  const [amount, setAmount] = useState(0);

  const { handleTrade: handleBuy, submitting } = useTrade({
    tradeType: getTradeType(securityType),
    portfolio:
      portfolios.find((portfolio) => portfolio.id === portfolioId) ||
      portfolios[0],
    securityName,
    ...getTradeAmountArgs(amount, securityType),
    ...security,
    currency: security.currency.securityCode,
  });

  const isTradeAmountCorrect =
    !isNaN(availableCash) && amount >= 0 && amount <= availableCash;

  return (
    <div className="grid gap-2 min-w-[min(84vw,_375px)]">
      <LabeledDiv
        label={t("tradingModal.securityName")}
        className="text-2xl font-semibold"
      >
        {securityName}
      </LabeledDiv>
      {url2 && (
        <div className="w-fit">
          <DownloadableDocument url={url2} label={t("tradingModal.kiid")} />
        </div>
      )}
      <PortfolioSelect
        portfolioOptions={portfolioOptions}
        portfolioId={portfolioId}
        onChange={(newPortfolio) => setPortfolioId(newPortfolio.id)}
        label={t("tradingModal.portfolio")}
      />
      <LabeledDiv
        label={t("tradingModal.availableCash")}
        className="text-xl font-semibold text-gray-700"
      >
        {portfolioCurrency &&
          t("numberWithCurrency", {
            value: availableCash,
            currency: portfolioCurrency,
          })}
      </LabeledDiv>
      <Input
        ref={modalInitialFocusRef}
        value={amount || ""}
        onChange={(event) => {
          setAmount(Number(event.currentTarget.value));
        }}
        label={
          isTransactionAmountDefinedAsUnits(securityType)
            ? t("tradingModal.unitsInputLabel")
            : t("tradingModal.tradeAmountInputLabel", {
                currency: portfolioCurrency,
              })
        }
        type="number"
        error={
          !isTradeAmountCorrect && !loading
            ? t("tradingModal.tradeAmountInputError")
            : undefined
        }
      />
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-stretch ">
        <div className="text-3xl font-semibold text-center">
          <div className="text-base font-normal">
            {t("tradingModal.tradeAmount")}
          </div>
          {t("numberWithCurrency", {
            value: isTradeAmountCorrect
              ? getTradeAmount(
                  amount,
                  securityType,
                  latestMarketData?.price,
                  fxRate
                )
              : 0,
            currency: portfolioCurrency,
          })}
        </div>
        <Button
          disabled={amount === 0 || loading || !isTradeAmountCorrect}
          isLoading={submitting}
          onClick={async () => {
            const response = await handleBuy();
            if (response) {
              onClose();
            }
          }}
        >
          {t("tradingModal.buyButtonLabel")}
        </Button>
      </div>
      <hr className="my-1" />
      <div className="text-xs text-center text-gray-600 max-w-[375px]">
        {t("tradingModal.buyDisclaimer")}
      </div>
    </div>
  );
};
