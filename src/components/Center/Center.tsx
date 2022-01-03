import React, { ReactNode } from "react";

export interface CenterProps {
  children: ReactNode;
}

export const Center = ({ children }: CenterProps) => (
  <div className="flex justify-center items-center h-full">{children}</div>
);
