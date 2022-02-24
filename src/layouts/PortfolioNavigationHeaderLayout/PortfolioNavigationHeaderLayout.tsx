import { Outlet } from "react-router-dom";
import { PortfolioNavigationHeader } from "./PortfolioNavigationHeader/PortfolioNavigationHeader";

export const PortfolioNavigationHeaderLayout = () => {
  return (
    <nav className="flex flex-col h-full">
      <PortfolioNavigationHeader />
      <Outlet />
    </nav>
  );
};
