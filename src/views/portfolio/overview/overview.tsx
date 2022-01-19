import React from "react";
import { DetailedPortfolio } from "api/overview/types";
import { useGetPortfolio } from "api/overview/useGetPortfolio";
import { QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ListedSecuritiesCard } from "./ListedSecuritiesCard/ListedSecuritiesCard";
import { PortfolioValueCard } from "./PortfolioValueCard/PortfolioValueCard";
import { useSecuritiesSummary } from "./useSecuritiesSummary/useSecuritiesSummary";

export const OverviewView = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolio(portfolioId);

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Overview} />;
};

interface OverviewProps {
  data: DetailedPortfolio;
}

const Overview = ({ data }: OverviewProps) => {
  const { t } = useTranslation();

  const {
    portfolioReport,
    currency: { securityCode: currency },
  } = data;
  const { topSecurities, worstSecurities } = useSecuritiesSummary(
    data.portfolioReport.securityPositions
  );
  const { positionMarketValue, accountBalance, valueChangeAbsolute } =
    portfolioReport;

  return (
    <div className="flex flex-col gap-4 items-start px-2 mb-2">
      <PortfolioValueCard
        label={t("portfolioSummary.currentMarketValue")}
        value={positionMarketValue}
        currency={currency}
      />
      <PortfolioValueCard
        label={t("portfolioSummary.unrealizedProfits")}
        value={valueChangeAbsolute}
        currency={currency}
      />
      <PortfolioValueCard
        label={t("portfolioSummary.availableCash")}
        value={accountBalance}
        currency={currency}
      />
      <ListedSecuritiesCard
        label={t("overviewPage.top3Holdings")}
        securities={topSecurities}
      />
      <ListedSecuritiesCard
        label={t("overviewPage.worst3Holdings")}
        securities={worstSecurities}
      />
    </div>
  );
};
