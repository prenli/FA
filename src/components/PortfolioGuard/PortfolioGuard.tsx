import { ReactNode } from "react";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { NoPortfolios } from "./components/NoPortfolios";

interface PortfolioGuardProps {
  children: ReactNode;
}

export const PortfolioGuard = ({ children }: PortfolioGuardProps) => {
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();

  if (portfolios.length === 0) {
    return <NoPortfolios />;
  }

  return <>{children}</>;
};
