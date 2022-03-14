import {
  ComponentProps,
  ReactNode,
  Fragment,
  forwardRef,
  ForwardedRef,
} from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { PageLayout } from "../../PageLayout/PageLayout";
import {
  PagesCarousel,
  PagesCarouselProps,
} from "../PagesCarousel/PagesCarousel";

const NavTab = (
  props: ComponentProps<typeof Tab>,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <div ref={ref}>
    <Tab
      className={({ selected }) =>
        classNames("border-current p-2 whitespace-nowrap text-base ", {
          "border-b border-primary-600 font-semibold text-primary-600":
            selected,
          "border-b border-transparent text-gray-600 font-normal": !selected,
        })
      }
      {...props}
    />
  </div>
);

// headlessui Tab do not forward ref
NavTab.NavTab = forwardRef(NavTab);

NavTab.Group = Tab.Group;

const NavTabList = (props: ComponentProps<typeof Tab.List>) => (
  <nav className="overflow-auto w-full bg-white border-b border-gray-200 shadow-md scroll-hidden">
    <Tab.List
      className="lg:container flex flex-nowrap items-end px-2 lg:mx-auto scroll-hidden"
      {...props}
    />
  </nav>
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
