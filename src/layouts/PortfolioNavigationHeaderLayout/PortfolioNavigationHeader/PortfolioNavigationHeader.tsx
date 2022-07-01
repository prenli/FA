import { UserMenu, Logo, PortfolioSelect } from "components";
import {
  TOTAL_INVESTMENTS_OPTION_ID,
  useGetPortfolioOptions,
} from "hooks/useGetPortfolioOptions";
import { Navigate, useParams } from "react-router-dom";
import { useNavigateToPortfolioTab } from "./useNavigateToPortfolioTab";
import { useRedirectIfOnlyOnePortfolio } from "./useRedirectIfOnlyOnePortfolio";

export interface PortfolioOption {
  id: number;
  urlPrefix: string;
  label: string;
}

export const PortfolioNavigationHeader = () => {
  const portfolioOptions = useGetPortfolioOptions();
  const { portfolioId } = useParams();
  const navigateToPortfolioTab = useNavigateToPortfolioTab();
  useRedirectIfOnlyOnePortfolio();
  const onPortfolioChange = (selectedOption: PortfolioOption) => {
    navigateToPortfolioTab(selectedOption.urlPrefix);
  };
  const currentPortfolio = portfolioId
    ? parseInt(portfolioId, 10)
    : TOTAL_INVESTMENTS_OPTION_ID;

  // redirect to root when portfolioId does not match available portfolios
  if (
    currentPortfolio !== TOTAL_INVESTMENTS_OPTION_ID &&
    !portfolioOptions.some((option) => option.id === currentPortfolio)
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="z-20 pt-2 bg-white">
      <div className="container flex gap-2 items-center p-2 mx-auto">
        <Logo />
        <div className="flex-1">
          {portfolioOptions.length > 1 ? (
            <div className="sm:min-w-[350px] sm:w-fit">
              <PortfolioSelect
                portfolioOptions={portfolioOptions}
                portfolioId={currentPortfolio}
                onChange={onPortfolioChange}
              />
            </div>
          ) : portfolioOptions.length === 1 ? (
            <div className="flex items-center ml-3 h-10 text-2xl font-bold text-gray-900">
              {portfolioOptions[0].label}
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="px-2">
          <UserMenu />
        </div>
      </div>
    </div>
  );
};
