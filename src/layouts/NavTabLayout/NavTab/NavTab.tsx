import { ComponentProps, ReactNode } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "preact";
import { PageLayout } from "../../PageLayout/PageLayout";
import {
  PagesCarousel,
  PagesCarouselProps,
} from "../PagesCarousel/PagesCarousel";

const NavTab = (props: ComponentProps<typeof Tab>) => (
  <Tab
    className={({ selected }) =>
      classNames("border-current p-2 whitespace-nowrap", {
        "border-b border-blue-600 font-semibold text-base text-blue-600":
          selected,
        "border-b border-transparent text-gray-600 text-base font-normal":
          !selected,
      })
    }
    {...props}
  />
);

NavTab.Group = Tab.Group;

const NavTabList = (props: ComponentProps<typeof Tab.List>) => (
  <Tab.List
    className="flex overflow-auto flex-nowrap px-2 bg-white border-b border-gray-200 shadow-md scroll-hidden"
    {...props}
  />
);
NavTab.List = NavTabList;

const NavTabPanels = (props: PagesCarouselProps) => (
  <PagesCarousel {...props}>{props.children}</PagesCarousel>
);
NavTab.Panels = NavTabPanels;

const NavTabPanel = (props: { children: ReactNode }) => (
  <PageLayout>
    <Fragment {...props} />
  </PageLayout>
);
NavTab.Panel = NavTabPanel;

export { NavTab };
