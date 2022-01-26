import { useParams } from "react-router-dom";
import { PortfolioOption } from "./PortfolioNavigationHeader";

export const useGetCurrentPortfolio = (portfolioOptions: PortfolioOption[]) => {
  const { portfolioId } = useParams();

  if (!portfolioId) {
    return portfolioOptions[0];
  }

  return portfolioOptions.find(
    (portfolio) => portfolio.id === parseInt(portfolioId, 10)
  );
};
