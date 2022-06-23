import { TradeType as SecurityTradeType } from "api/trading/useTrade";
import {
  LocalTradeOrderId,
  LocalTradeOrderStatus,
  useTradingStorage,
} from "hooks/useTradingStorage";
import i18n from "i18next";
import { dateToYYYYMMDD } from "utils/date";
import { assertUnreachable } from "utils/type";

export type TradeType = SecurityTradeType | "withdrawal" | "deposit";

const getOrderType = (type: TradeType) => {
  switch (type) {
    case "buy":
      return {
        typeName: i18n.t("ordersPage.buyStatus"),
        amountEffect: 1,
        cashFlowEffect: -1,
      };
    case "sell":
      return {
        typeName: i18n.t("ordersPage.sellStatus"),
        amountEffect: -1,
        cashFlowEffect: 1,
      };
    case "subscription":
      return {
        typeName: i18n.t("ordersPage.subscriptionStatus"),
        amountEffect: 1,
        cashFlowEffect: -1,
      };
    case "redemption":
      return {
        typeName: i18n.t("ordersPage.redemptionStatus"),
        amountEffect: -1,
        cashFlowEffect: 1,
      };
    case "withdrawal":
      return {
        typeName: i18n.t("ordersPage.withdrawStatus"),
        amountEffect: 0,
        cashFlowEffect: -1,
      };
    case "deposit":
      return {
        typeName: i18n.t("ordersPage.depositStatus"),
        amountEffect: 0,
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

export interface LocalTradeOrderDetails {
  portfolio: {
    id: number;
    name: string;
    shortName: string;
  };
  securityName: string;
  currency: string;
  tradeType: TradeType;
  reference: string;
  units?: number;
  tradeAmount?: number;
}

export const useLocalTradeOrders = () => {
  const { placeOrder } = useTradingStorage();

  return async (tradeDetails: LocalTradeOrderDetails) => {
    const {
      portfolio,
      securityName,
      tradeAmount,
      units,
      currency,
      tradeType,
      reference,
    } = tradeDetails;

    await placeOrder({
      id: LocalTradeOrderId,
      orderStatus: LocalTradeOrderStatus,
      securityName: securityName,
      type: getOrderType(tradeType),
      transactionDate: dateToYYYYMMDD(new Date()),
      tradeAmountInPortfolioCurrency: tradeAmount,
      amount: units,
      parentPortfolio: {
        id: portfolio.id,
        name: portfolio.name,
        currency: { securityCode: currency },
      },
      reference,
    });
  };
};
