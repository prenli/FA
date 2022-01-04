import { ReactNode } from "react";

export interface NavTabPath {
  path: string;
  element: ReactNode;
  tabLabel: ReactNode;
  tabComponent: ReactNode;
}
