import { isPortfolioDepositable } from "services/permissions/money";
import { useFilteredPortfolioSelect } from "../useFilteredPortfolioSelect";

export const useDepositablePortfolioSelect = () => {
  return useFilteredPortfolioSelect(isPortfolioDepositable);
};
