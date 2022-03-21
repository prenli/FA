import { Suspense } from "react";
import { LoadingIndicator, LogoutButton } from "components";
import { useIsPortfolioNavigationHeaderVisible } from "../../hooks/useIsPortfolioNavigationHeaderVisible";
import { PortfolioNavigationHeader } from "../PortfolioNavigationHeaderLayout/PortfolioNavigationHeader/PortfolioNavigationHeader";
import { NavTab } from "./NavTab/NavTab";
import { NavTabPath } from "./NavTab/types";
import { useNavTab } from "./NavTab/useNavTab";

interface NavTabTemplateLayoutProps {
  routes: NavTabPath[];
}

export const NavTabLayout = ({ routes }: NavTabTemplateLayoutProps) => {
  const { tabsRef, groupProps, panelsProps } = useNavTab({
    navTabPaths: routes,
  });
  const showPortfolioNavigationHeader = useIsPortfolioNavigationHeaderVisible();

  return (
    <div className="flex overflow-auto flex-col flex-1 items-stretch">
      <NavTab.Group {...groupProps}>
        <NavTab.List>
          {showPortfolioNavigationHeader && (
            <div className="min-w-[300px]">
              <PortfolioNavigationHeader />
            </div>
          )}
          {routes.map((route, index) => (
            <NavTab.NavTab
              key={`NavTab_${index}`}
              ref={(el: HTMLDivElement) => (tabsRef.current[index] = el)}
            >
              {route.tabLabel}
            </NavTab.NavTab>
          ))}
          {showPortfolioNavigationHeader && (
            <div className="flex justify-end grow">
              <LogoutButton />
            </div>
          )}
        </NavTab.List>
        <Suspense fallback={<LoadingIndicator center />}>
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
