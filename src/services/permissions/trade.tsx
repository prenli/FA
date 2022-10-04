import { ReactNode } from "react";
import { Portfolio, useGetContactInfo } from "api/initial/useGetContactInfo";
import { useGetContractIdData } from "providers/ContractIdProvider";
import { useParams } from "react-router-dom";

export const tradableTag = "Tradeable";

export const TradePermissionGroup = "CP_TRADING" as const;

export const isPortfolioTradable = (portfolio: Portfolio) =>
  portfolio.portfolioGroups.some(
    (group) => group.code === TradePermissionGroup
  );

export const useCanTrade = () => {
  const { portfolioId } = useParams();
  const { selectedContactId } = useGetContractIdData();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo(false, selectedContactId);

  return portfolios
    .filter(
      (portfolio) => !portfolioId || portfolio.id === parseInt(portfolioId, 10)
    )
    .some(isPortfolioTradable);
};

interface CanTradeProps {
  children: ReactNode;
  fallbackNode?: ReactNode;
}

export const CanTrade = ({ children, fallbackNode = null }: CanTradeProps) => {
  const canTrade = useCanTrade();
  return <>{canTrade ? children : fallbackNode}</>;
};
