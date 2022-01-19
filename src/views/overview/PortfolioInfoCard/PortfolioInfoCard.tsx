import React from "react";
import { Card } from "components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PortfolioInfoRow } from "../PortfolioInfoRow/PortfolioInfoRow";

interface PortfolioInfoCardProps {
  name: string;
  marketValue: number;
  valueChangeAbsolute: number;
  accountBalance: number;
  positionMarketValue: number;
  id?: number;
}

export const PortfolioInfoCard = ({
  marketValue,
  valueChangeAbsolute,
  accountBalance,
  positionMarketValue,
  name,
  id,
}: PortfolioInfoCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToPortfolioDetails = () => {
    if (!id) {
      return;
    }
    navigate(`/portfolio/${id}`);
  };

  return (
    <Card>
      <div className="p-3" onClick={navigateToPortfolioDetails}>
        <div className="pb-1 mb-1 font-bold border-b">
          <PortfolioInfoRow
            label={name}
            value={t("number", { value: marketValue })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <PortfolioInfoRow
            label={t("portfolioSummary.currentMarketValue")}
            value={t("number", { value: positionMarketValue })}
          />
          <PortfolioInfoRow
            label={t("portfolioSummary.availableCash")}
            value={t("number", { value: accountBalance })}
          />
          <PortfolioInfoRow
            label={t("portfolioSummary.unrealizedProfits")}
            value={t("number", { value: valueChangeAbsolute })}
          />
        </div>
      </div>
    </Card>
  );
};
