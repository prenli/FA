import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";

const CASH_ACCOUNTS_QUERY = gql`
  query GetCashAccounts($portfolioId: Long) {
    portfolio(id: $portfolioId) {
      id
      portfolioReport {
        portfolioId
        accountItems {
          accountName
          currency {
            securityCode
          }
          accountId
          amountAfterOpenTradeOrders
          balance
          number: key
        }
      }
    }
  }
`;

interface APICashAccount {
  accountName: string;
  currency: {
    securityCode: string;
  };
  accountId: number;
  amountAfterOpenTradeOrders: number;
  balance: number;
  number: string;
}

interface PortfolioCashAccountsQuery {
  portfolio: {
    portfolioReport: {
      currency: {
        securityCode: string;
      };
      accountItems: APICashAccount[];
    };
  };
}

export interface CashAccount {
  id: number;
  label: string;
  number: string;
  currency: string;
  currentBalance: number;
  availableBalance: number;
}

const mapCashAccount = (account: APICashAccount): CashAccount => ({
  id: account.accountId,
  label: account.accountName,
  number: account.number,
  currency: account.currency.securityCode,
  currentBalance: account.balance,
  availableBalance: account.amountAfterOpenTradeOrders,
});

export const useGetPortfoliosAccounts = (portfolioId: string | undefined) => {
  const { loading, error, data } = useQuery<PortfolioCashAccountsQuery>(
    CASH_ACCOUNTS_QUERY,
    {
      variables: {
        portfolioId,
      },
      ...getFetchPolicyOptions(`useGetCashAccounts.${portfolioId}`),
    }
  );

  return {
    loading,
    error,
    data: useMemo(
      () =>
        data && {
          cashAccounts:
            data.portfolio.portfolioReport.accountItems?.map(mapCashAccount),
        },
      [data]
    ),
  };
};
