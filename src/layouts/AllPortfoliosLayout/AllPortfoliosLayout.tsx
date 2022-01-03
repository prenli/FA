import React from "react";
import { mainTabRoutes } from "pages/routes";
import { NavTabLayout } from "../NavTabLayout/NavTabLayout";
import { Heading } from "./Heading/Heading";

export const AllPortfoliosLayout = () => {
  return (
    <div className="container flex flex-col mx-auto min-h-screen">
      <Heading />
      <div className="flex flex-col flex-1">
        <NavTabLayout routes={mainTabRoutes} />
      </div>
    </div>
  );
};
