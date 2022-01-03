import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { NavTabPath } from "./types";

interface useNavTabProps {
  navTabPaths: NavTabPath[];
}

export const useNavTab = ({ navTabPaths }: useNavTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.split("/").at(-1);
  const currentTabIndex = getActiveTabIndex(navTabPaths, activePath);
  // wasDragged inform us if slide change was initiated by touch swipe/dragging of carousel (not by clicking tab or programmatically)
  const [wasDragged, setWasDragged] = useState(false);

  const navigateToTab = (newIndex: number) => {
    navigate(`../${navTabPaths[newIndex].path}`);
  };

  return {
    groupProps: {
      selectedIndex: currentTabIndex,
      onChange: navigateToTab,
    },
    panelsProps: {
      slideIndex: currentTabIndex,
      afterSlide: (newIndex: number) => {
        if (wasDragged) {
          navigateToTab(newIndex);
        }
        setWasDragged(false);
      },
      onDragStart: () => setWasDragged(true),
    },
  };
};

const getActiveTabIndex = (
  routes: NavTabPath[],
  activePath: string | undefined
) => routes.findIndex((route) => route.path === activePath);
