import { ReactNode } from "react";

export interface HeadingProps {
  children: ReactNode;
}

export const Heading = ({ children }: HeadingProps) => (
  <div className="flex gap-2 items-center p-2 text-2xl font-bold bg-white border-b border-gray-200 shadow-md">
    {children}
  </div>
);
