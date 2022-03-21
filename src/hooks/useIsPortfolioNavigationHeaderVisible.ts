import { useMatchesBreakpoint } from "./useMatchesBreakpoint";

export const useIsPortfolioNavigationHeaderVisible = () => {
  return useMatchesBreakpoint("lg");
};
