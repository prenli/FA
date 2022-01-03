import React from "react";
import { portfolioTabRoutes } from "pages/portfolio/routes";
import { NavTabLayout } from "../NavTabLayout/NavTabLayout";
import { Heading } from "./Heading/Heading";

export const PortfolioLayout = () => {
  return (
    <div className="container flex flex-col mx-auto min-h-screen">
      <Heading />
      <div className="flex flex-col flex-1">
        <NavTabLayout routes={portfolioTabRoutes} />
      </div>
    </div>
  );
};
