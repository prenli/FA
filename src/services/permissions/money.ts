import { Portfolio, useGetContactInfo } from "api/initial/useGetContactInfo";
import { useGetContractIdData } from "providers/ContractIdProvider";

export const DepositPermissionGroup = "CP_DEPOSIT" as const;
export const WithdrawalPermissionGroup = "CP_WITHDRAWAL" as const;

export const isPortfolioDepositable = (portfolio: Portfolio) =>
  portfolio.portfolioGroups.some(
    (group) => group.code === DepositPermissionGroup
  );

export const useCanDeposit = () => {
  const { selectedContactId } = useGetContractIdData();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo(false, selectedContactId);
  return portfolios.some(isPortfolioDepositable);
};

export const isPortfolioWithdrawable = (portfolio: Portfolio) =>
  portfolio.portfolioGroups.some(
    (group) => group.code === WithdrawalPermissionGroup
  );

export const useCanWithdraw = () => {
  const { selectedContactId } = useGetContractIdData();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo(false, selectedContactId);
  return portfolios.some(isPortfolioWithdrawable);
};
