import React from "react";
import { mainTabRoutes } from "pages/routes";
import { NavTabLayout } from "../NavTabLayout/NavTabLayout";
import { Heading } from "./Heading/Heading";

export const AllPortfoliosLayout = () => {
  return (
    <div className="container flex flex-col mx-auto h-screen">
      <Heading />
      <div className="flex overflow-auto flex-col flex-1">
        <NavTabLayout routes={mainTabRoutes} />
      </div>
    </div>
  );
};
