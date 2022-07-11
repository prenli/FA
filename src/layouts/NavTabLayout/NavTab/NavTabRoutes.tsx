import { Navigate, useRoutes } from "react-router-dom";
import { useCanTrade } from "services/permissions/trade";
import { NavTabLayout } from "../NavTabLayout";
import { NavTabPath } from "./types";

interface NavTabRoutesProps {
  routes: NavTabPath[];
}

export const NavTabRoutes = ({ routes }: NavTabRoutesProps) => {
  const canTrade = useCanTrade();

  const filteredRoutes = routes.filter(
    (route) => canTrade || route.path !== "trading"
  );

  return useRoutes([
    {
      path: "",
      element: <NavTabLayout routes={filteredRoutes} />,
      children: filteredRoutes,
    },
    {
      path: "*",
      element: <Navigate to="overview" replace />,
    },
  ]);
};
