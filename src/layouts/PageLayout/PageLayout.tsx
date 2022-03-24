import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="container py-4 mx-auto">
      <div className="px-2">{children}</div>
    </div>
  );
};
