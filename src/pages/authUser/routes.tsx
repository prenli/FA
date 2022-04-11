import { lazy } from "react";
import { MainLayout } from "layouts/MainLayout/MainLayout";
import { Navigate, useRoutes } from "react-router-dom";
import { MissingLinkedContact } from "views/missingLinkedContact/missingLinkedContact";

const Form = lazy(() =>
  import("./form").then((module) => ({ default: module.FormPage }))
);

export const authUserMainRoutes = [
  {
    path: "",
    element: <MissingLinkedContact />,
  },
  {
    path: "form/:formKey",
    element: <Form />,
  },
];

export const AuthUserMainRoutes = () =>
  useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        ...authUserMainRoutes,
        {
          path: "*",
          element: <Navigate to="" replace />,
        },
      ],
    },
  ]);
