import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <div className="w-full rounded border shadow-md">{children}</div>
);
