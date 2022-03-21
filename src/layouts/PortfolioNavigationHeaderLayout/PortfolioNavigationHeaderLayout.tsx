import { Outlet } from "react-router-dom";
import { useIsPortfolioNavigationHeaderVisible } from "../../hooks/useIsPortfolioNavigationHeaderVisible";
import { PortfolioNavigationHeader } from "./PortfolioNavigationHeader/PortfolioNavigationHeader";

export const PortfolioNavigationHeaderLayout = () => {
  const showPortfolioNavigationHeader =
    !useIsPortfolioNavigationHeaderVisible();
  return (
    <div className="flex flex-col h-full">
      {showPortfolioNavigationHeader && <PortfolioNavigationHeader />}
      <Outlet />
    </div>
  );
};
