import { ReactNode } from "react";

export interface HeadingProps {
  children: ReactNode;
}

export const Heading = ({ children }: HeadingProps) => (
  <div className="bg-white border-b border-gray-200 shadow-md ">
    <div className="lg:container flex gap-2 items-center p-2 lg:mx-auto text-2xl font-bold">
      {children}
    </div>
  </div>
);
