import { UserMenu } from "components";
import { Select } from "components/Select/Select";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useIsPortfolioNavigationHeaderVisible } from "../../../hooks/useIsPortfolioNavigationHeaderVisible";
import { useGetCurrentPortfolio } from "./useGetCurrentPortfolio";
import { useGetPortfolioOptions } from "./useGetPortfolioOptions";
import { useNavigateToPortfolioTab } from "./useNavigateToPortfolioTab";
import { useRedirectIfOnlyOnePortfolio } from "./useRedirectIfOnlyOnePortfolio";

export interface PortfolioOption {
  id: number;
  urlPrefix: string;
  label: string;
}

export const PortfolioNavigationHeader = () => {
  const portfolioOptions = useGetPortfolioOptions();
  const currentPortfolio = useGetCurrentPortfolio(portfolioOptions);
  const navigateToPortfolioTab = useNavigateToPortfolioTab();
  useRedirectIfOnlyOnePortfolio();
  const onPortfolioChange = (selectedOption: PortfolioOption) => {
    navigateToPortfolioTab(selectedOption.urlPrefix);
  };
  const showUserMenu = !useIsPortfolioNavigationHeaderVisible();
  const { portfolioId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 p-2 lg:p-1 bg-white">
      <div
        className="rounded cursor-pointer h-[40px] w-[40px]"
        onClick={() =>
          navigate(
            portfolioId ? `/portfolio/${portfolioId}/overview` : "/overview"
          )
        }
      >
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="flex-1">
        {portfolioOptions.length > 1 ? (
          <Select
            value={currentPortfolio}
            onChange={onPortfolioChange}
            options={portfolioOptions}
          />
        ) : (
          <div className="flex items-center ml-3 h-10 text-2xl font-bold text-gray-900">
            {portfolioOptions[0].label}
          </div>
        )}
      </div>
      {showUserMenu && <UserMenu />}
    </div>
  );
};
