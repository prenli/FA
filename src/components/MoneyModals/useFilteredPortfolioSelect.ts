import { useState } from "react";
import { Portfolio } from "api/initial/useGetContactInfo";
import { usePortfolioSelect } from "hooks/usePortfolioSelect";

export const useFilteredPortfolioSelect = (
  filterFunction: (portfolio: Portfolio) => boolean
) => {
  const { portfolioOptions, portfolioId: firstChoicePortfolioId } =
    usePortfolioSelect();
  const filteredPortfolioOptions = portfolioOptions.filter(
    (option) => option.details && filterFunction(option.details)
  );
  // override state from usePortfolioSelect to make sure that portfolioId is from filtered options
  const [portfolioId, setPortfolioId] = useState(() => {
    if (
      filteredPortfolioOptions.some(
        (option) => option.id === firstChoicePortfolioId
      )
    ) {
      return firstChoicePortfolioId;
    }
    return filteredPortfolioOptions[0].id;
  });

  return {
    portfolioId,
    setPortfolioId,
    portfolioOptions: filteredPortfolioOptions,
  };
};
