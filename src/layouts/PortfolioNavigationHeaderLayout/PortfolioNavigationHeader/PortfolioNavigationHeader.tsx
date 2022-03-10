import { ReactComponent as Logo } from "assets/logo.svg";
import { Select } from "components/Select/Select";
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

  return (
    <div className="flex gap-2 p-2 lg:p-1 bg-white">
      <div className="rounded h-[40px] w-[40px]">
        <Logo />
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
    </div>
  );
};
