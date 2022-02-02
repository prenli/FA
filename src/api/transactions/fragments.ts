import { gql } from "@apollo/client";

export const TRANSACTION_FIELDS = gql`
  fragment TransactionsFields on Transaction {
    id
    transactionDate
    type {
      typeName
      typeNamesAsMap
      cashFlowEffect
    }
    tradeAmountInPortfolioCurrency
    securityName
    parentPortfolio {
      name
      currency {
        securityCode
      }
    }
  }
`;
// transactions type tag colors
// amountEffect > 0 cashFlowEffect < 0 - blue
// amountEffect < 0 cashFlowEffect > 0 - red

export const TRANSACTION_DETAILS_FIELDS = gql`
  fragment TransactionDetailsFields on Transaction {
    amount
    security {
      isinCode
    }
    settlementDate
    unitPrice
    grossPrice
    totalCost
    tradeAmount
    currencyCode
  }
`;
