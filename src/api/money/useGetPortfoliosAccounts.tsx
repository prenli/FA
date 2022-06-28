import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";

const CASH_ACCOUNTS_QUERY = gql`
  query GetCashAccounts($portfolioId: Long) {
    portfolio(id: $portfolioId) {
      id
      accounts {
        id
        label: name
        category
      }
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

interface APIAccount {
  id: number;
  label: string;
  category: string;
}

interface PortfolioCashAccountsQuery {
  portfolio: {
    accounts: APIAccount[];
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

export type ExternalAccount = APIAccount;

const mapCashAccount = (account: APICashAccount): CashAccount => ({
  id: account.accountId,
  label: account.accountName,
  number: account.number,
  currency: account.currency.securityCode,
  currentBalance: account.balance,
  availableBalance: account.amountAfterOpenTradeOrders,
});

const EXTERNAL_CATEGORY_NAME = "External";

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
          externalAccounts: data.portfolio.accounts.filter(
            (account) => account.category === EXTERNAL_CATEGORY_NAME
          ),
        },
      [data]
    ),
  };
};
