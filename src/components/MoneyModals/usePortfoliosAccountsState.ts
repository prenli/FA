import { useEffect, useState } from "react";
import {
  CashAccount,
  useGetPortfoliosAccounts,
} from "api/money/useGetPortfoliosAccounts";

export const usePortfoliosAccountsState = (portfolioId: number) => {
  const { data: { cashAccounts = [] } = {}, loading } =
    useGetPortfoliosAccounts(portfolioId.toString());
  useEffect(() => {
    if (cashAccounts.length > 0) {
      setCurrentCashAccount(cashAccounts[0]);
    }
  }, [cashAccounts]);
  const [currentCashAccount, setCurrentCashAccount] = useState<CashAccount>();

  return {
    currentCashAccount,
    setCurrentCashAccount,
    cashAccounts,
    accountsLoading: loading,
  };
};
