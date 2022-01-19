import { gql } from "@apollo/client";

export const TRADE_ORDERS_DETAILS = gql`
  fragment TradeOrdersDetails on Transaction {
    id
    orderStatus
    securityName
    type {
      typeName
      typeNamesAsMap
    }
    transactionDate
    tradeAmountInPortfolioCurrency
    parentPortfolio {
      name
      currency {
        securityCode
      }
    }
  }
`;
