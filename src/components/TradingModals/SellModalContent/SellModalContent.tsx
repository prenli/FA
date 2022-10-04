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
import { useGetContractIdData } from "providers/ContractIdProvider";
import { useParams } from "react-router-dom";
import { round } from "utils/number";
import { useGetSecurityDetails } from "../../../api/holdings/useGetSecurityDetails";
import { useTradablePortfolioSelect } from "../useTradablePortfolioSelect";
import { useTradeAmountInput } from "./useTradeAmountInput";

export interface SellModalInitialData {
  id: number;
}

interface SellModalProps extends SellModalInitialData {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
}

const isTransactionAmountDefinedAsUnits = (
  securityType: SecurityTypeCode | undefined
) => securityType !== "C";

const getTradeType = (securityType: SecurityTypeCode | undefined) =>
  isTransactionAmountDefinedAsUnits(securityType) ? "sell" : "redemption";

const getCurrentAmount = (
  securityType: SecurityTypeCode | undefined,
  amount: number,
  marketValue: number,
  marketFxRate: number
) =>
  isTransactionAmountDefinedAsUnits(securityType)
    ? amount
    : round(marketValue * marketFxRate, 2);

const getTradeAmount = (
  securityType: SecurityTypeCode | undefined,
  tradeAmount: number,
  price: number
) =>
  isTransactionAmountDefinedAsUnits(securityType)
    ? tradeAmount * price
    : tradeAmount;

const getTradeAmountArgs = (
  amount: number,
  securityType: SecurityTypeCode | undefined
) =>
  isTransactionAmountDefinedAsUnits(securityType)
    ? { units: amount }
    : { tradeAmount: amount };

export const SellModalContent = ({
  modalInitialFocusRef,
  onClose,
  id: securityId,
}: SellModalProps) => {
  const {
    data: security = {
      name: "",
      url2: undefined,
      type: { code: undefined },
      latestMarketData: undefined,
      fxRate: 1,
      securityCode: "",
      currency: { securityCode: "" },
    },
  } = useGetSecurityDetails(securityId.toString());
  const {
    name: securityName,
    currency: { securityCode: currency },
    url2,
    type: { code: securityType } = {},
    latestMarketData: { price } = { price: 0 },
  } = security;
  const { holdingId } = useParams();
  const { t } = useModifiedTranslation();
  const { selectedContactId } = useGetContractIdData();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo(false, selectedContactId);
  const { portfolioId, setPortfolioId, portfolioOptions } =
    useTradablePortfolioSelect();

  const {
    loading,
    data: { marketValue = 0, marketFxRate = 1, amount: units = 0 } = {},
  } = useGetPortfolioHoldingDetails(portfolioId.toString(), holdingId);
  const currentAmount = getCurrentAmount(
    securityType,
    units,
    marketValue,
    marketFxRate
  );

  const {
    inputValue,
    setInputState,
    inputModesOptions,
    inputMode,
    isTradeAmountCorrect,
    amount,
    setTradeAmountToAll,
    setTradeAmountToHalf,
    onInputModeChange,
  } = useTradeAmountInput(currentAmount, currency);

  const { handleTrade: handleSell, submitting } = useTrade({
    tradeType: getTradeType(securityType),
    portfolio:
      portfolios.find((portfolio) => portfolio.id === portfolioId) ||
      portfolios[0],
    securityName,
    ...getTradeAmountArgs(amount, securityType),
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
      {isTransactionAmountDefinedAsUnits(securityType) ? (
        <LabeledDiv
          label={t("tradingModal.currentUnits")}
          className="text-xl font-semibold text-gray-700"
        >
          {currency &&
            t("number", {
              value: currentAmount,
            })}
        </LabeledDiv>
      ) : (
        <LabeledDiv
          label={t("tradingModal.currentMarketValue")}
          className="text-xl font-semibold text-gray-700"
        >
          {currency &&
            t("numberWithCurrency", {
              value: currentAmount,
              currency: currency,
            })}
        </LabeledDiv>
      )}
      <Input
        ref={modalInitialFocusRef}
        value={inputValue || ""}
        onChange={(event) => {
          setInputState((previousState) => {
            const target = event.target as HTMLInputElement;
            return {
              ...previousState,
              inputValue: Number(target?.value || 0),
            };
          });
        }}
        label={
          isTransactionAmountDefinedAsUnits(securityType)
            ? t("tradingModal.unitsInputLabel")
            : t("tradingModal.tradeAmountInputLabel", {
                currency: inputMode.label,
              })
        }
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
          {!isTransactionAmountDefinedAsUnits(securityType) && (
            <Button
              size="xs"
              variant="Secondary"
              onClick={setTradeAmountToHalf}
            >
              {t("tradingModal.sellHalf")}
            </Button>
          )}
        </div>
        {!isTransactionAmountDefinedAsUnits(securityType) && (
          <HorizontalRadio
            options={inputModesOptions}
            value={inputMode}
            onChange={onInputModeChange}
          />
        )}
      </div>
      <hr className="my-2" />
      <div className="flex flex-col gap-4 items-stretch ">
        <div className="text-3xl font-semibold text-center">
          <div className="text-base font-normal">
            {t("tradingModal.tradeAmount")}
          </div>
          {t("numberWithCurrency", {
            value: isTradeAmountCorrect
              ? getTradeAmount(securityType, amount, price)
              : 0,
            currency,
          })}
        </div>
        <Button
          disabled={amount === 0 || loading || !isTradeAmountCorrect}
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
    </div>
  );
};
