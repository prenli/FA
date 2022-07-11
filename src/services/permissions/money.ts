import { Portfolio, useGetContactInfo } from "api/initial/useGetContactInfo";

export const DepositPermissionGroup = "CP_DEPOSIT" as const;
export const WithdrawalPermissionGroup = "CP_WITHDRAWAL" as const;

export const isPortfolioDepositable = (portfolio: Portfolio) =>
  portfolio.portfolioGroups.some(
    (group) => group.code === DepositPermissionGroup
  );

export const useCanDeposit = () => {
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();
  return portfolios.some(isPortfolioDepositable);
};

export const isPortfolioWithdrawable = (portfolio: Portfolio) =>
  portfolio.portfolioGroups.some(
    (group) => group.code === WithdrawalPermissionGroup
  );

export const useCanWithdraw = () => {
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();
  return portfolios.some(isPortfolioWithdrawable);
};
