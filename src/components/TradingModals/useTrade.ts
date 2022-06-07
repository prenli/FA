import {
  LocalTradeOrderId,
  LocalTradeOrderStatus,
  useTradingState,
} from "hooks/useTradingState";
import i18n from "i18next";
import { dateToYYYYMMDD } from "utils/date";
import { assertUnreachable } from "utils/type";

type TradeType = "sell" | "buy";

const getOrderType = (type: TradeType) => {
  switch (type) {
    case "buy":
      return {
        typeName: i18n.t("tradingModal.buyStatus"),
        amountEffect: 1,
        cashFlowEffect: -1,
      };
    case "sell":
      return {
        typeName: i18n.t("tradingModal.sellStatus"),
        amountEffect: -1,
        cashFlowEffect: 1,
      };
    default:
      assertUnreachable(type);
      return {
        typeName: "",
        amountEffect: 1,
        cashFlowEffect: -1,
      };
  }
};

interface TradeDetails {
  portfolio?: {
    id: number;
    label: string;
  };
  securityName?: string;
  currency?: string;
  tradeAmount?: number;
}

export const useTrade = (
  type: TradeType,
  callback: () => void,
  tradeDetails: TradeDetails
) => {
  const { placeOrder } = useTradingState();

  const { portfolio, securityName, tradeAmount, currency } = tradeDetails;

  return async () => {
    if (
      portfolio == null ||
      securityName == null ||
      tradeAmount == null ||
      currency == null
    ) {
      return;
    }
    await placeOrder({
      id: LocalTradeOrderId,
      orderStatus: LocalTradeOrderStatus,
      securityName: securityName,
      type: getOrderType(type),
      transactionDate: dateToYYYYMMDD(new Date()),
      tradeAmountInPortfolioCurrency: tradeAmount,
      parentPortfolio: {
        id: portfolio.id,
        name: portfolio.label,
        currency: {
          securityCode: currency,
        },
      },
    });
    callback();
  };
};
