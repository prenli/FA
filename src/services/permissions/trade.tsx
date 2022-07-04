import { ReactNode } from "react";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { useParams } from "react-router-dom";

export const TradePermissionGroup = "CP_TRADING" as const;

export const useCanTrade = () => {
  const { portfolioId } = useParams();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();

  return portfolios
    .filter(
      (portfolio) => !portfolioId || portfolio.id === parseInt(portfolioId, 10)
    )
    .some((portfolio) =>
      portfolio.portfolioGroups.some(
        (group) => group.code === TradePermissionGroup
      )
    );
};

interface CanTradeProps {
  children: ReactNode;
  fallbackNode?: ReactNode;
}

// TODO: permission logic when API will be available
export const trade = true;

export const CanTrade = ({ children, fallbackNode = null }: CanTradeProps) => {
  return <>{trade ? children : fallbackNode}</>;
};
