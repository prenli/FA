import { DetailedPortfolio } from "api/overview/types";
import { useGetPortfolio } from "api/overview/useGetPortfolio";
import { Card, QueryLoadingWrapper } from "components";
import { PieChart } from "components/PieChart/PieChart";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useParams } from "react-router-dom";
import { PortfolioInfoCard } from "../../overview/components/PortfolioInfoCard";
import { ListedSecuritiesCard } from "./components/ListedSecuritiesCard";
import { PortfolioSummary } from "./components/PortfolioSummary";
import { useGetChartData } from "./hooks/useGetChartData";
import { useSecuritiesSummary } from "./hooks/useSecuritiesSummary";

export const OverviewView = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolio(portfolioId);

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Overview} />;
};

interface OverviewProps {
  data: DetailedPortfolio;
}

const Overview = ({ data }: OverviewProps) => {
  const { t } = useModifiedTranslation();

  const {
    portfolioReport: {
      portfolio: {
        currency: { securityCode },
      },
    },
  } = data;

  const { topSecurities, worstSecurities } = useSecuritiesSummary(
    data.portfolioReport.securityPositions
  );

  const chartData = useGetChartData(data);

  const breakPortfolioInfoCard = useMatchesBreakpoint("md");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
      <div className="grid md:grid-cols-3 md:col-span-2 gap-4">
        {breakPortfolioInfoCard ? (
          <PortfolioSummary {...data.portfolioReport} />
        ) : (
          <PortfolioInfoCard {...data.portfolioReport} name={data.name} />
        )}
      </div>
      <div className="grid gap-4">
        <ListedSecuritiesCard
          label={t("overviewPage.top3Holdings")}
          securities={topSecurities}
          currency={securityCode}
        />
        <ListedSecuritiesCard
          label={t("overviewPage.worst3Holdings")}
          securities={worstSecurities}
          currency={securityCode}
        />
      </div>
      <div className="">
        <Card header="Security type allocation">
          <div className="pt-4 grow min-h-[300px]">
            <PieChart {...chartData} />
          </div>
        </Card>
      </div>
    </div>
  );
};
