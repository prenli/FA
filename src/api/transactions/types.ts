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
    isinCode: string;
    securityCode: string;
    country: {
      id: number;
      code: string;
    };
    exchange?: {
      name: string;
    };
  };
  settlementDate: string;
  unitPrice: number;
  grossPrice: number;
  totalCost: number;
  tradeAmount: number;
  currencyCode: string;
  fxRate: number;
  documents: {
    identifier: string;
  }[];
  extInfo: string;
  marketPlace?: {
    name: string;
  };
}

export interface TransactionDetailsQuery {
  transaction: TransactionDetails;
}
