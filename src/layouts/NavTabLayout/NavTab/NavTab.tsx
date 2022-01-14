import React, { ComponentProps, ReactNode } from "react";
import { Tab } from "@headlessui/react";
import {
  PagesCarousel,
  PagesCarouselProps,
} from "../PagesCarousel/PagesCarousel";

const NavTab = (props: ComponentProps<typeof Tab>) => (
  <Tab
    className={({ selected }) =>
      ` border-current px-2 py-0 whitespace-nowrap ${
        selected ? "border-b-2 font-semibold" : "border-b-0"
      }`
    }
    {...props}
  />
);

NavTab.Group = Tab.Group;

const NavTabList = (props: ComponentProps<typeof Tab.List>) => (
  <Tab.List
    className="flex overflow-auto flex-nowrap p-2 scroll-hidden border-y-2"
    {...props}
  />
);
NavTab.List = NavTabList;

const NavTabPanels = (props: PagesCarouselProps) => (
  <PagesCarousel {...props}>{props.children}</PagesCarousel>
);
NavTab.Panels = NavTabPanels;

const NavTabPanel = (props: { children: ReactNode }) => (
  <div className="overflow-x-hidden m-4 h-full" {...props} />
);
NavTab.Panel = NavTabPanel;

export { NavTab };
