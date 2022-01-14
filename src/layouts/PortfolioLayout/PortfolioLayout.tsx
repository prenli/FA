import React from "react";
import { portfolioTabRoutes } from "pages/portfolio/routes";
import { NavTabLayout } from "../NavTabLayout/NavTabLayout";
import { Heading } from "./Heading/Heading";

export const PortfolioLayout = () => {
  return (
    <div className="container flex flex-col mx-auto max-w-full h-screen">
      <Heading />
      <div className="flex overflow-auto flex-col flex-1">
        <NavTabLayout routes={portfolioTabRoutes} />
      </div>
    </div>
  );
};
