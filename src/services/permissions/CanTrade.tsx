import { ReactNode } from "react";

interface CanTradeProps {
  children: ReactNode;
  fallbackNode?: ReactNode;
}

// TODO: permission logic when API will be available
export const canTrade = true;

export const CanTrade = ({ children, fallbackNode = null }: CanTradeProps) => {
  return <>{canTrade ? children : fallbackNode}</>;
};
