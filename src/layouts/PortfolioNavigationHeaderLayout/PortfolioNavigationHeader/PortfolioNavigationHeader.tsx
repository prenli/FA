import { ReactComponent as Logo } from "assets/logo.svg";
import { Select } from "components/Select/Select";
import { useGetCurrentPortfolio } from "./useGetCurrentPortfolio";
import { useGetPortfolioOptions } from "./useGetPortfolioOptions";
import { useNavigateToPortfolioTab } from "./useNavigateToPortfolioTab";

export interface PortfolioOption {
  id: number;
  urlPrefix: string;
  label: string;
}

export const PortfolioNavigationHeader = () => {
  const portfolioOptions = useGetPortfolioOptions();
  const currentPortfolio = useGetCurrentPortfolio(portfolioOptions);
  const navigateToPortfolioTab = useNavigateToPortfolioTab();
  const onPortfolioChange = (selectedOption: PortfolioOption) => {
    navigateToPortfolioTab(selectedOption.urlPrefix);
  };

  return (
    <div className="flex gap-2 p-2 bg-white">
      <div className="rounded h-[40px] w-[40px]">
        <Logo />
      </div>
      <div className="flex-1">
        <Select
          value={currentPortfolio}
          onChange={onPortfolioChange}
          options={portfolioOptions}
        />
      </div>
    </div>
  );
};
