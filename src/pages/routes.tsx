import React, { lazy } from "react";
import { TranslationText } from "components";
import { AllPortfoliosLayout } from "layouts/AllPortfoliosLayout/AllPortfoliosLayout";
import { MainLayout } from "layouts/MainLayout/MainLayout";
import { NavTabPath } from "layouts/NavTabLayout/NavTab/types";
import { useRoutes, Navigate } from "react-router-dom";
import { portfolioRoutes } from "./portfolio/routes";

const Overview = lazy(() =>
  import("./overview").then((module) => ({ default: module.OverviewPage }))
);
const Holdings = lazy(() =>
  import("./holdings").then((module) => ({ default: module.HoldingsPage }))
);
const Holding = lazy(() =>
  import("./holdings/[holdingId]").then((module) => ({
    default: module.HoldingPage,
  }))
);
const Transactions = lazy(() =>
  import("./transactions").then((module) => ({
    default: module.TransactionsPage,
  }))
);
const Transaction = lazy(() =>
  import("./transactions/[transactionId]").then((module) => ({
    default: module.Transaction,
  }))
);
const Orders = lazy(() =>
  import("./orders").then((module) => ({ default: module.OrdersPage }))
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
  {
    path: "transactions/:transactionId",
    element: <Transaction />,
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
        element: <TranslationText translationKey="404Page.title" />,
      },
    ],
  },
];

export const RootRoutes = () => useRoutes(rootRoutes);
