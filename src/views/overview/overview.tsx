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
    <div className="grid gap-4 mb-4 grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))]">
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
