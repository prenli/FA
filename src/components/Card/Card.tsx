import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  header?: ReactNode;
}

export const Card = ({ children, header }: CardProps) => (
  <div className="flex overflow-hidden flex-col w-full h-full bg-white rounded-lg border shadow-md">
    {header && (
      <div className="p-2 text-2xl font-bold bg-gray-200">{header}</div>
    )}
    {children}
  </div>
);
