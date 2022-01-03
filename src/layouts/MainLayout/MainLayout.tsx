import React, { Suspense } from "react";
import { LoadingIndicator, Center } from "components";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Suspense
      fallback={
        <Center>
          <LoadingIndicator />
        </Center>
      }
    >
      <Outlet />
    </Suspense>
  );
};
