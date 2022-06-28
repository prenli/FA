import { MutableRefObject } from "react";
import { SecurityTypeCode } from "api/holdings/types";
import { useGetPortfolioHoldingDetails } from "api/holdings/useGetPortfolioHoldingDetails";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { useTrade } from "api/trading/useTrade";
import {
  PortfolioSelect,
  DownloadableDocument,
  Button,
  Input,
  HorizontalRadio,
  LabeledDiv,
} from "components/index";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { usePortfolioSelect } from "hooks/usePortfolioSelect";
import { useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useTradeAmountInput } from "./useTradeAmountInput";

export interface SellModalInitialData {
  name: string;
  securityCode: string;
  url2?: string;
  currency: {
    securityCode: string;
  };
  type?: {
    code: SecurityTypeCode;
  };
}

interface SellModalProps extends SellModalInitialData {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
}

const getTradeType = (securityType: SecurityTypeCode | undefined) =>
  securityType === "C" ? "redemption" : "sell";

export const SellModalContent = ({
  modalInitialFocusRef,
  onClose,
  ...security
}: SellModalProps) => {
  const {
    name: securityName,
    url2,
    type: { code: securityType } = {},
  } = security;
  const { holdingId } = useParams();
  const { t } = useModifiedTranslation();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();
  const { portfolioId, setPortfolioId, portfolioOptions } =
    usePortfolioSelect();

  const { data: { portfoliosCurrency: currency = "EUR" } = {} } =
    useGetContactInfo();
  const {
    loading,
    error,
    data: { marketValue = 0 } = {},
  } = useGetPortfolioHoldingDetails(portfolioId.toString(), holdingId);

  const {
    inputValue,
    setInputState,
    inputModesOptions,
    inputMode,
    isTradeAmountCorrect,
    tradeAmount,
    setTradeAmountToAll,
    setTradeAmountToHalf,
    onInputModeChange,
  } = useTradeAmountInput(marketValue, currency);

  const { handleTrade: handleSell, submitting } = useTrade({
    tradeType: getTradeType(securityType),
    portfolio:
      portfolios.find((portfolio) => portfolio.id === portfolioId) ||
      portfolios[0],
    securityName,
    tradeAmount,
    ...security,
    currency,
  });

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
        label={t("tradingModal.currentMarketValue")}
        className="text-xl font-semibold text-gray-700"
      >
        {currency &&
          t("numberWithCurrency", {
            value: marketValue,
            currency: currency,
          })}
      </LabeledDiv>
      <Input
        ref={modalInitialFocusRef}
        value={inputValue || ""}
        onChange={(event) => {
          setInputState((previousState) => ({
            ...previousState,
            inputValue: Number(event.currentTarget.value),
          }));
        }}
        label={t("tradingModal.tradeAmountInputLabel", {
          currency: inputMode.label,
        })}
        type="number"
        error={
          !isTradeAmountCorrect && !loading
            ? t("tradingModal.tradeAmountInputError")
            : undefined
        }
      />
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <Button size="xs" variant="Secondary" onClick={setTradeAmountToAll}>
            {t("tradingModal.sellAll")}
          </Button>
          <Button size="xs" variant="Secondary" onClick={setTradeAmountToHalf}>
            {t("tradingModal.sellHalf")}
          </Button>
        </div>
        <HorizontalRadio
          options={inputModesOptions}
          value={inputMode}
          onChange={onInputModeChange}
        />
      </div>
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
          isLoading={submitting}
          onClick={async () => {
            const response = await handleSell();
            if (response) {
              onClose();
            }
          }}
        >
          {t("tradingModal.sellModalHeader")}
        </Button>
      </div>
      {error && (
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          hideProgressBar
          theme="colored"
          transition={Slide}
          autoClose={false}
        >
          {t("tradingModal.queryErrorWarning")}
        </ToastContainer>
      )}
    </div>
  );
};
