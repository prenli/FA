import React from "react";
import { Outlet } from "react-router-dom";
import { PortfolioNavigationHeader } from "./PortfolioNavigationHeader/PortfolioNavigationHeader";

export const PortfolioNavigationHeaderLayout = () => {
  return (
    <div className="container flex flex-col mx-auto h-full">
      <PortfolioNavigationHeader />
      <Outlet />
    </div>
  );
};
