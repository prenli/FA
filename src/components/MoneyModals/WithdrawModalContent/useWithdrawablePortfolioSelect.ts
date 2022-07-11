import { isPortfolioWithdrawable } from "services/permissions/money";
import { useFilteredPortfolioSelect } from "../useFilteredPortfolioSelect";

export const useWithdrawablePortfolioSelect = () => {
  return useFilteredPortfolioSelect(isPortfolioWithdrawable);
};
