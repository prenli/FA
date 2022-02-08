import React from "react";
import { AllPortfolios } from "api/overview/types";
import { useGetAllPortfolios } from "api/overview/useGetAllPortfolios";
import { QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { PortfolioInfoCard } from "./components/PortfolioInfoCard";

export const OverviewView = () => {
  const queryData = useGetAllPortfolios();

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Overview} />;
};

interface OverviewProps {
  data: AllPortfolios;
}

const Overview = ({ data }: OverviewProps) => {
  const { t } = useTranslation();
  const { portfolioReport: allPortfoliosReport, portfolios } = data;

  return (
    <div className="flex flex-col gap-4 items-start mb-4">
      <PortfolioInfoCard
        {...allPortfoliosReport}
        name={t("overviewPage.allPortfoliosSummaryTitle")}
        colorScheme="black"
        // there is no way to get currency for aggregated portfolioReport (portfolioReport under contact context),
        // but all portfolios have same currency, so we use currency from first one
        portfolio={portfolios[0]?.portfolioReport.portfolio}
      />
      {portfolios.map((portfolio) => {
        const { name, portfolioReport, id } = portfolio;
        return (
          <PortfolioInfoCard
            key={id}
            {...portfolioReport}
            id={id}
            name={name}
          />
        );
      })}
    </div>
  );
};
