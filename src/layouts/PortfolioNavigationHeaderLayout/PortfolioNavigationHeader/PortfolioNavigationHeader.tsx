import { UserMenu, Logo, PortfolioSelect } from "components";
import {
  TOTAL_INVESTMENTS_OPTION_ID,
  useGetPortfolioOptions,
} from "hooks/useGetPortfolioOptions";
import { useGetContractIdData } from "providers/ContractIdProvider";
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
  const { selectedContact } = useGetContractIdData();
 
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
    <div className="z-20 pt-2 bg-white px-2">
      <div className="container flex items-center justify-between gap-2 mx-auto">
        <Logo />
        <div className="flex-auto flex-shrink justify-start w-1/2 sm:min-w-[350px]">
          {portfolioOptions.length > 0 ? (
            <div className="max-w-[350px]">
              <PortfolioSelect
                portfolioOptions={portfolioOptions}
                portfolioId={currentPortfolio}
                onChange={onPortfolioChange}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="flex justify-end">
          <span className="self-center pl-2 pr-1 text-xl font-bold text-gray-400">{selectedContact.initials}</span>
          <div className="">
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
