import React, { lazy } from "react";
import { TranslationText } from "components";
import { NavTabPath } from "layouts/NavTabLayout/NavTab/types";
import { PortfolioLayout } from "layouts/PortfolioLayout/PortfolioLayout";
import { Navigate } from "react-router-dom";

const Overview = lazy(() =>
  import("./overview").then((module) => ({ default: module.OverviewPage }))
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

export const portfolioTabRoutes: NavTabPath[] = [
  {
    path: "overview",
    tabLabel: <TranslationText translationKey="navTab.tabs.overview" />,
    tabComponent: <Overview />,
    element: null,
  },
  {
    path: "holdings",
    tabLabel: <TranslationText translationKey="navTab.tabs.holdings" />,
    tabComponent: <Holdings />,
    element: null,
  },
  {
    path: "transactions",
    tabLabel: <TranslationText translationKey="navTab.tabs.transactions" />,
    tabComponent: <Transactions />,
    element: null,
  },
  {
    path: "orders",
    tabLabel: <TranslationText translationKey="navTab.tabs.orders" />,
    tabComponent: <Orders />,
    element: null,
  },
  {
    path: "trading",
    tabLabel: <TranslationText translationKey="navTab.tabs.trading" />,
    tabComponent: <Trading />,
    element: null,
  },
  {
    path: "documents",
    tabLabel: <TranslationText translationKey="navTab.tabs.documents" />,
    tabComponent: <Documents />,
    element: null,
  },
];

export const portfolioRoutes = [
  {
    path: "portfolio/:portfolioId",
    children: [
      {
        path: "",
        element: <Navigate to="overview" replace />,
      },
      {
        path: "",
        element: <PortfolioLayout />,
        children: portfolioTabRoutes,
      },
      {
        path: "holdings/:holdingId",
        element: <Holding />,
      },
    ],
  },
];
