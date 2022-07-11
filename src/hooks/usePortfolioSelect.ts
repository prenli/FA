import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPortfolioOptions } from "./useGetPortfolioOptions";

export const usePortfolioSelect = () => {
  const { portfolioId: urlPortfolioId } = useParams();
  const portfolioOptions = useGetPortfolioOptions(false);
  const [portfolioId, setPortfolioId] = useState(
    urlPortfolioId ? parseInt(urlPortfolioId, 10) : portfolioOptions[0].id
  );

  return { portfolioId, setPortfolioId, portfolioOptions };
};
