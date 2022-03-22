import { Outlet } from "react-router-dom";
import { PortfolioNavigationHeader } from "./PortfolioNavigationHeader/PortfolioNavigationHeader";

export const PortfolioNavigationHeaderLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <PortfolioNavigationHeader />
      <Outlet />
    </div>
  );
};
