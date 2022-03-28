import { ReactNode } from "react";
import { BaseReport, DetailedPortfolio } from "api/overview/types";
import { useGetPortfolio } from "api/overview/useGetPortfolio";
import { Card, GainLoseColoring, QueryLoadingWrapper } from "components";
import { PieChart } from "components/PieChart/PieChart";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CardWithChartBackground } from "../../overview/components/CardWithChartBackground";
import { PortfolioInfoCard } from "../../overview/components/PortfolioInfoCard";
import { ListedSecuritiesCard } from "./components/ListedSecuritiesCard";
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
  const { t } = useTranslation();

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
          <PortfolioInfoCard
            {...data.portfolioReport}
            name={data.name}
            colorScheme="blue"
          />
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

interface DataCardProps {
  value: ReactNode;
  label: string;
}

const DataCard = ({ value, label }: DataCardProps) => (
  <CardWithChartBackground>
    <div className="p-4">
      <div className="text-sm font-normal text-gray-600">{label}</div>
      <div className="text-3xl font-medium text-gray-900">{value}</div>
    </div>
  </CardWithChartBackground>
);

const PortfolioSummary = ({
  portfolio: {
    currency: { securityCode },
  },
  marketValue,
  valueChangeAbsolute,
  accountBalance,
}: BaseReport) => {
  const { t } = useTranslation();

  return (
    <>
      <DataCard
        label={t("portfolioSummary.currentMarketValue")}
        value={t("numberWithCurrencyRounded", {
          value: marketValue,
          currency: securityCode,
          maximumFractionDigits: 0,
        })}
      />
      <DataCard
        label={t("portfolioSummary.unrealizedProfits")}
        value={
          <GainLoseColoring value={valueChangeAbsolute}>
            {t("numberWithCurrencyRounded", {
              value: valueChangeAbsolute,
              currency: securityCode,
              formatParams: {
                value: { signDisplay: "always" },
              },
            })}
          </GainLoseColoring>
        }
      />
      <DataCard
        label={t("portfolioSummary.availableCash")}
        value={t("numberWithCurrencyRounded", {
          value: accountBalance,
          currency: securityCode,
        })}
      />
    </>
  );
};
