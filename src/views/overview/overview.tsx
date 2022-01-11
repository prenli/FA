import React from "react";
import { useGetAllPortfolios } from "api/useGetAllPortfolios";
import { Center, LoadingIndicator, QueryError } from "components";
import { useTranslation } from "react-i18next";
import { PortfolioInfoCard } from "./PortfolioInfoCard/PortfolioInfoCard";

export const Overview = () => {
  const { t } = useTranslation();
  const { error, summary } = useGetAllPortfolios();

  if (error) {
    return <QueryError />;
  }

  if (summary) {
    const { portfolioReport: allPortfoliosReport, portfolios } = summary;

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
  }

  return (
    <Center>
      <LoadingIndicator />
    </Center>
  );
};
