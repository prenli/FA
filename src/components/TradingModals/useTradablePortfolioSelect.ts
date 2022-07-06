import { usePortfolioSelect } from "hooks/usePortfolioSelect";
import { isPortfolioTradable } from "services/permissions/trade";

export const useTradablePortfolioSelect = () => {
  const { portfolioOptions, ...rest } = usePortfolioSelect();

  return {
    ...rest,
    portfolioOptions: portfolioOptions.filter(
      (option) => option.details && isPortfolioTradable(option.details)
    ),
  };
};
