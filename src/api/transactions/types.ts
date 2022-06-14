export interface Transaction {
  id: number;
  amount: number;
  transactionDate: string;
  type: {
    typeName: string;
    typeNamesAsMap: Record<string, string>;
    cashFlowEffect: number;
    amountEffect: number;
  };
  tradeAmountInPortfolioCurrency: number;
  securityName: string;
  parentPortfolio: {
    name: string;
    currency: {
      securityCode: string;
    };
  };
}

export interface PortfolioTransactionsQuery {
  portfolio: {
    transactions: Transaction[];
  };
}

export interface AllPortfoliosTransactionsQuery {
  contact: {
    transactions: Transaction[];
  };
}

export interface TransactionDetails extends Transaction {
  security?: {
    id: number;
    isinCode: string;
    country?: {
      id: number;
      code: string;
    };
    exchange?: {
      name: string;
    };
  };
  settlementDate: string;
  unitPriceInSecurityCurrency: number;
  costInSecurityCurrency: number;
  accountFxRate: number;
  documents: {
    identifier: string;
  }[];
  extInfo: string;
  marketPlace?: {
    name: string;
  };
  account?: {
    currency: {
      accountCurrencyCode: string;
    };
  };
  securityCurrencyCode: string;
  tradeAmountInAccountCurrency: number;
  tradeAmountInSecurityCurrency: number;
  grossPriceInSecurityCurrency: number;
  grossPriceInAccountCurrency: number;
}

export interface TransactionDetailsQuery {
  transaction: TransactionDetails;
}
