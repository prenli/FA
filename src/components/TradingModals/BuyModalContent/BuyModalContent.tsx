import { MutableRefObject, useState } from "react";
import { SecurityTypeCode } from "api/holdings/types";
import { useGetBuyData } from "api/trading/useGetBuyData";
import {
  PortfolioSelect,
  DownloadableDocument,
  Button,
  Input,
  LabeledDiv,
} from "components/index";
import { useLocalTradeOrders } from "hooks/useLocalTradeOrders";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { usePortfolioSelect } from "hooks/usePortfolioSelect";
import { Slide, toast } from "react-toastify";

export interface BuyModalInitialData {
  name?: string;
  url2?: string;
  securityCode?: string;
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

const BUY_MODAL_ERROR_TOAST_ID = "BUY_MODAL_ERROR_TOAST_ID";

// buying non-Collective investment should be defined in units instead of trade amount
const isTransactionAmountDefinedAsUnits = (
  securityType: SecurityTypeCode | undefined
) => securityType !== "C";

const getTradeAmount = (
  amount: number,
  securityType: SecurityTypeCode | undefined,
  price = 1,
  fxRate = 1
) =>
  isTransactionAmountDefinedAsUnits(securityType)
    ? amount * price * fxRate
    : amount;

export const BuyModalContent = ({
  name: securityName,
  url2,
  securityCode,
  type,
  latestMarketData,
  fxRate,
  modalInitialFocusRef,
  onClose,
}: BuyModalProps) => {
  const { t } = useModifiedTranslation();
  const { portfolioId, setPortfolioId, portfolioOptions } =
    usePortfolioSelect();
  const {
    loading,
    error,
    data: { availableCash = 0, currency = "EUR" } = {},
  } = useGetBuyData(portfolioId.toString());

  const [amount, setAmount] = useState(0);

  const handleBuy = useLocalTradeOrders("buy", onClose, {
    portfolio: portfolioOptions.find(
      (portfolio) => portfolio.id === portfolioId
    ),
    securityName,
    currency,
    amount,
  });

  const isTradeAmountCorrect =
    !isNaN(availableCash) && amount >= 0 && amount <= availableCash;

  if (error) {
    toast.error(t("tradingModal.queryErrorWarning"), {
      toastId: BUY_MODAL_ERROR_TOAST_ID,
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      theme: "colored",
      transition: Slide,
      autoClose: false,
    });
  }

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
        {currency &&
          t("numberWithCurrency", {
            value: availableCash,
            currency: currency,
          })}
      </LabeledDiv>
      <Input
        ref={modalInitialFocusRef}
        value={amount || ""}
        onChange={(event) => {
          setAmount(Number(event.currentTarget.value));
        }}
        label={
          isTransactionAmountDefinedAsUnits(type?.code)
            ? t("tradingModal.unitsInputLabel")
            : t("tradingModal.tradeAmountInputLabel", {
                currency: currency,
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
                  type?.code,
                  latestMarketData?.price,
                  fxRate
                )
              : 0,
            currency,
          })}
        </div>
        <Button
          disabled={amount === 0 || loading || !isTradeAmountCorrect}
          onClick={handleBuy}
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
