import { useEffect, useState } from "react";
import {
  CashAccount,
  ExternalAccount,
  useGetPortfoliosAccounts,
} from "api/money/useGetPortfoliosAccounts";

export const usePortfoliosAccountsState = (portfolioId: number) => {
  const { data: { externalAccounts = [], cashAccounts = [] } = {}, loading } =
    useGetPortfoliosAccounts(portfolioId.toString());
  useEffect(() => {
    if (cashAccounts.length > 0) {
      setCurrentCashAccount(cashAccounts[0]);
    }
    setCurrentExternalAccount(externalAccounts[0]);
  }, [cashAccounts, externalAccounts]);
  const [currentCashAccount, setCurrentCashAccount] = useState<CashAccount>();
  const [currentExternalAccount, setCurrentExternalAccount] = useState<
    ExternalAccount | undefined
  >();

  return {
    currentCashAccount,
    setCurrentCashAccount,
    cashAccounts,
    currentExternalAccount,
    setCurrentExternalAccount,
    externalAccounts,
    accountsLoading: loading,
  };
};
