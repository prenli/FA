import { ReactNode } from "react";

interface CanTradeProps {
  children: ReactNode;
  fallbackNode?: ReactNode;
}

export const CanTrade = ({ children, fallbackNode = null }: CanTradeProps) => {
  // TODO: permission logic when API will be available
  const canTrade = true;

  return <>{canTrade ? children : fallbackNode}</>;
};
