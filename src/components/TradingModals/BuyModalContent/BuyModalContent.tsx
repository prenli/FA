import { HTMLAttributes, MutableRefObject, ReactNode, useState } from "react";
import { useGetBuyData } from "api/trading/useGetBuyData";
import classNames from "classnames";
import {
  PortfolioSelect,
  DownloadableDocument,
  Button,
  Input,
} from "components/index";
import { useGetPortfolioOptions } from "hooks/useGetPortfolioOptions";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useTrade } from "../useTrade";

export interface BuyModalInitialData {
  holdingId?: string | number;
  securityName?: string;
  url2?: string;
}

interface BuyModalProps extends BuyModalInitialData {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
}

const BUY_MODAL_ERROR_TOAST_ID = "BUY_MODAL_ERROR_TOAST_ID";

export const BuyModalContent = ({
  holdingId,
  securityName,
  url2,
  modalInitialFocusRef,
  onClose,
}: BuyModalProps) => {
  const { t } = useModifiedTranslation();
  const { portfolioId: urlPortfolioId } = useParams();
  const portfolioOptions = useGetPortfolioOptions(false);
  const [portfolioId, setPortfolioId] = useState(
    urlPortfolioId ? parseInt(urlPortfolioId, 10) : portfolioOptions[0].id
  );
  const {
    loading,
    error,
    data: { availableCash = 0, currency = "EUR" } = {},
  } = useGetBuyData(portfolioId.toString());

  const [tradeAmount, setTradeAmount] = useState(0);

  const handleBuy = useTrade("buy", onClose, {
    portfolio: portfolioOptions.find(
      (portfolio) => portfolio.id === portfolioId
    ),
    securityName,
    currency,
    tradeAmount,
  });

  const isTradeAmountCorrect =
    !isNaN(availableCash) && tradeAmount >= 0 && tradeAmount <= availableCash;

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
        portfolioId={portfolioId}
        onChange={(newPortfolio) => setPortfolioId(newPortfolio.id)}
        includeTotal={false}
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
        value={tradeAmount || ""}
        onChange={(event) => {
          setTradeAmount(Number(event.currentTarget.value));
        }}
        label={t("tradingModal.tradeAmountInputLabel", {
          currency: currency,
        })}
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
            value: isTradeAmountCorrect ? tradeAmount : 0,
            currency,
          })}
        </div>
        <Button
          disabled={tradeAmount === 0 || loading || !isTradeAmountCorrect}
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

interface LabeledDivProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

const LabeledDiv = ({
  label,
  children,
  className,
  ...rest
}: LabeledDivProps) => (
  <div className={classNames(className, "leading-7")} {...rest}>
    <div className="text-sm font-normal">{label}</div>
    {children}
  </div>
);
