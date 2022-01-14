import React, { Suspense } from "react";
import { Center, LoadingIndicator } from "../../components";
import { NavTab } from "./NavTab/NavTab";
import { NavTabPath } from "./NavTab/types";
import { useNavTab } from "./NavTab/useNavTab";

interface NavTabTemplateLayoutProps {
  routes: NavTabPath[];
}

export const NavTabLayout = ({ routes }: NavTabTemplateLayoutProps) => {
  const { groupProps, panelsProps } = useNavTab({
    navTabPaths: routes,
  });

  return (
    <div className="flex overflow-auto flex-col flex-1 items-stretch">
      <NavTab.Group {...groupProps}>
        <NavTab.List>
          {routes.map((route, index) => (
            <NavTab key={`NavTab_${index}`}>{route.tabLabel}</NavTab>
          ))}
        </NavTab.List>
        <Suspense
          fallback={
            <Center>
              <LoadingIndicator />
            </Center>
          }
        >
          <NavTab.Panels {...panelsProps}>
            {routes.map((route, index) => (
              <NavTab.Panel key={index}>{route.tabComponent}</NavTab.Panel>
            ))}
          </NavTab.Panels>
        </Suspense>
      </NavTab.Group>
    </div>
  );
};
