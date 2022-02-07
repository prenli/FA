import React, { Suspense } from "react";
import { LoadingIndicator, Center } from "components";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="box-border mt-8 text-gray-900 bg-gray-50 h-[calc(100vh-2rem)]">
      <ErrorBoundary>
        <Suspense
          fallback={
            <Center>
              <LoadingIndicator />
            </Center>
          }
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
