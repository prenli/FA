import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPortfolioOptions } from "./useGetPortfolioOptions";
import { useNavigateToPortfolioTab } from "./useNavigateToPortfolioTab";

export const useRedirectIfOnlyOnePortfolio = () => {
  const navigateToPortfolioTab = useNavigateToPortfolioTab();
  const portfolioOptions = useGetPortfolioOptions();
  const { portfolioId } = useParams();

  useEffect(() => {
    if (portfolioOptions.length === 1 && !portfolioId) {
      navigateToPortfolioTab(portfolioOptions[0].urlPrefix);
    }
  }, [navigateToPortfolioTab, portfolioOptions, portfolioId]);
};
