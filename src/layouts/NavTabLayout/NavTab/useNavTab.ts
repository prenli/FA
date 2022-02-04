import { useNavigate, useLocation } from "react-router";
import { SwipeDirection } from "../PagesCarousel/PagesCarousel";
import { NavTabPath } from "./types";

interface useNavTabProps {
  navTabPaths: NavTabPath[];
}

export const useNavTab = ({ navTabPaths }: useNavTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.split("/").slice(-1)[0];
  const currentTabIndex = getActiveTabIndex(navTabPaths, activePath);

  const navigateToTab = (newIndex: number) => {
    navigate(`../${navTabPaths[newIndex].path}`);
  };

  return {
    groupProps: {
      selectedIndex: currentTabIndex,
      onChange: navigateToTab,
    },
    panelsProps: {
      currentPageIndex: currentTabIndex,
      onPageSwipe: (direction: SwipeDirection) => {
        navigateToTab(
          getCurrentTabIndexAfterSwipe(
            currentTabIndex,
            direction,
            navTabPaths.length
          )
        );
      },
    },
  };
};

const getActiveTabIndex = (
  routes: NavTabPath[],
  activePath: string | undefined
) => routes.findIndex((route) => route.path === activePath);

const getCurrentTabIndexAfterSwipe = (
  currentTabIndex: number,
  direction: SwipeDirection,
  tabsCount: number
) =>
  Math.max(
    0,
    Math.min(currentTabIndex + (direction === "left" ? 1 : -1), tabsCount - 1)
  );
