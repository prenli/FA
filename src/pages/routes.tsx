import { lazy } from "react";
import { TranslationText } from "components";
import { MainLayout } from "layouts/MainLayout/MainLayout";
import { NavTabPath } from "layouts/NavTabLayout/NavTab/types";
import { useRoutes, Navigate } from "react-router-dom";
import { NotFoundView } from "views/notFoundView/notFoundView";
import { NavTabLayout } from "../layouts/NavTabLayout/NavTabLayout";
import { PortfolioNavigationHeaderLayout } from "../layouts/PortfolioNavigationHeaderLayout/PortfolioNavigationHeaderLayout";
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
const TransactionDetails = lazy(() =>
  import("./transactions/[transactionId]").then((module) => ({
    default: module.TransactionDetailsPage,
  }))
);
const Orders = lazy(() =>
  import("./orders").then((module) => ({ default: module.OrdersPage }))
);
const OrderDetails = lazy(() =>
  import("./orders/[orderId]").then((module) => ({
    default: module.OrderDetailsPage,
  }))
);
const Documents = lazy(() =>
  import("./documents").then((module) => ({ default: module.DocumentsPage }))
);
const Contact = lazy(() =>
  import("./contact").then((module) => ({ default: module.ContactPage }))
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
    path: "documents",
    tabLabel: <TranslationText translationKey="navTab.tabs.documents" />,
    tabComponent: <Documents />,
    element: null,
  },
  {
    path: "contact",
    tabLabel: <TranslationText translationKey="navTab.tabs.contact" />,
    tabComponent: <Contact />,
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
    element: <PortfolioNavigationHeaderLayout />,
    children: [
      {
        path: "",
        element: <NavTabLayout routes={mainTabRoutes} />,
        children: mainTabRoutes,
      },
    ],
  },
  {
    path: "holdings/:holdingId",
    element: <Holding />,
  },
  {
    path: "transactions/:transactionId",
    element: <TransactionDetails />,
  },
  {
    path: "orders/:orderId",
    element: <OrderDetails />,
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
        element: <NotFoundView />,
      },
    ],
  },
];

export const RootRoutes = () => useRoutes(rootRoutes);
