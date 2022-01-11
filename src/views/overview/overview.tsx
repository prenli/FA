import React from "react";
import { useGetAllPortfolios } from "api/useGetAllPortfolios";
import { QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { AllPortfolios } from "../../api/types";
import { PortfolioInfoCard } from "./PortfolioInfoCard/PortfolioInfoCard";

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
    <div className="flex flex-col gap-4 items-start px-3 mb-4">
      <PortfolioInfoCard
        {...allPortfoliosReport}
        name={t("overviewPage.allPortfoliosSummaryTitle")}
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
