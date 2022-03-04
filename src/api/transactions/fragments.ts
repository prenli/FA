import { gql } from "@apollo/client";

export const TRANSACTION_FIELDS = gql`
  fragment TransactionsFields on Transaction {
    id
    amount
    transactionDate
    type {
      typeName
      typeNamesAsMap
      cashFlowEffect
      amountEffect
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

export const TRANSACTION_DETAILS_FIELDS = gql`
  fragment TransactionDetailsFields on Transaction {
    id
    amount
    security {
      id
      isinCode
      exchange {
        id
        name
      }
    }
    settlementDate
    unitPrice
    grossPrice
    totalCost
    tradeAmount
    currencyCode
    fxRate
    documents {
      identifier
    }
    extInfo
    marketPlace {
      id
      name
    }
  }
`;
