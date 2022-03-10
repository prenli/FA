import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { Outlet } from "react-router-dom";
import { PortfolioNavigationHeader } from "./PortfolioNavigationHeader/PortfolioNavigationHeader";

export const PortfolioNavigationHeaderLayout = () => {
  const showPortfolioNavigationHeader = !useMatchesBreakpoint("lg");
  return (
    <div className="flex flex-col h-full">
      {showPortfolioNavigationHeader && <PortfolioNavigationHeader />}
      <Outlet />
    </div>
  );
};
