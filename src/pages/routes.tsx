import React, { lazy } from "react";
import { AllPortfoliosLayout } from "layouts/AllPortfoliosLayout/AllPortfoliosLayout";
import { MainLayout } from "layouts/MainLayout/MainLayout";
import { NavTabPath } from "layouts/NavTabLayout/NavTab/types";
import { useRoutes, Navigate } from "react-router-dom";
import { portfolioRoutes } from "./portfolio/routes";

const Overview = lazy(() =>
  import("./overview").then((module) => ({ default: module.Overview }))
);
const Holdings = lazy(() =>
  import("./holdings").then((module) => ({ default: module.Holdings }))
);
const Holding = lazy(() =>
  import("./holdings/[holdingId]").then((module) => ({
    default: module.Holding,
  }))
);
const Transactions = lazy(() =>
  import("./transactions").then((module) => ({ default: module.Transactions }))
);
const Orders = lazy(() =>
  import("./orders").then((module) => ({ default: module.Orders }))
);
const Trading = lazy(() =>
  import("./trading").then((module) => ({ default: module.Trading }))
);
const Documents = lazy(() =>
  import("./documents").then((module) => ({ default: module.Documents }))
);

export const mainTabRoutes: NavTabPath[] = [
  {
    path: "overview",
    tabLabel: "Overview",
    tabComponent: <Overview />,
    element: null,
  },
  {
    path: "holdings",
    tabLabel: "Holdings",
    tabComponent: <Holdings />,
    element: null,
  },
  {
    path: "transactions",
    tabLabel: "Transactions",
    tabComponent: <Transactions />,
    element: null,
  },
  {
    path: "orders",
    tabLabel: "Trade orders",
    tabComponent: <Orders />,
    element: null,
  },
  {
    path: "trading",
    tabLabel: "Trading",
    tabComponent: <Trading />,
    element: null,
  },
  {
    path: "documents",
    tabLabel: "Documents",
    tabComponent: <Documents />,
    element: null,
  },
];

const mainRoutes = [
  {
    path: "",
    element: <Navigate to="overview" replace />,
  },
  {
    path: "",
    element: <AllPortfoliosLayout />,
    children: mainTabRoutes,
  },
  {
    path: "holdings/:holdingId",
    element: <Holding />,
  },
];

const rootRoutes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      ...mainRoutes,
      ...portfolioRoutes,
      {
        path: "*",
        element: <h1 className="text-2xl">404 - Not Found</h1>,
      },
    ],
  },
];

export const RootRoutes = () => useRoutes(rootRoutes);
