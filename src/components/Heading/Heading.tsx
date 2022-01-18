import React, { ReactNode } from "react";

export interface HeadingProps {
  children: ReactNode;
}

export const Heading = ({ children }: HeadingProps) => (
  <div className="flex gap-2 p-2 text-2xl font-bold bg-white border-b-2">
    {children}
  </div>
);
