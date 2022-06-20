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
  currency: string;
  currentBalance: number;
  availableBalance: number;
}

const mapAccount = (account: APICashAccount): CashAccount => ({
  id: account.accountId,
  label: account.accountName,
  currency: account.currency.securityCode,
  currentBalance: account.balance,
  availableBalance: account.amountAfterOpenTradeOrders,
});

export const useGetCashAccounts = (portfolioId: string | undefined) => {
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
        data && data.portfolio.portfolioReport.accountItems?.map(mapAccount),
      [data]
    ),
  };
};
