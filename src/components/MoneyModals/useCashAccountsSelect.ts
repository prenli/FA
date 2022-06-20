import { useEffect, useState } from "react";
import { CashAccount, useGetCashAccounts } from "api/money/useGetCashAccounts";

export const useCashAccountsSelect = (portfolioId: number) => {
  const { data: accounts = [], loading } = useGetCashAccounts(
    portfolioId.toString()
  );
  useEffect(() => {
    if (accounts.length > 0) {
      setCurrentAccount(accounts[0]);
    }
  }, [accounts]);
  const [currentAccount, setCurrentAccount] = useState<CashAccount>();

  return {
    currentAccount,
    setCurrentAccount,
    accountOptions: accounts,
    accountsLoading: loading,
  };
};
