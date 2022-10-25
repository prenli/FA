import { useState } from "react";
import { DetailedPortfolio } from "api/overview/types";
import { useGetPortfolio } from "api/overview/useGetPortfolio";
import { TimePeriodForGraph } from "api/performance/types";
import { useGetPerformance } from "api/performance/useGetPerformance";
import { ReactComponent as Spinner } from "assets/spinner.svg";
import classNames from "classnames";
import {
  Button,
  ButtonRadio,
  Card,
  Center, LabeledDiv,
  LineChart,
  QueryLoadingWrapper,
} from "components";
import { Option } from "components/ButtonRadio/ButtonRadio";
import { PieChart } from "components/PieChart/PieChart";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useParams } from "react-router-dom";
import { dateFromYYYYMMDD } from "utils/date";
import {useModal} from "../../../components/Modal/useModal";
import {MonthlyInvestmentModal} from "../../../components/MonthlyInvestmentsModal/MonthlyInvestmentModal";
import { PortfolioInfoCard } from "../../overview/components/PortfolioInfoCard";
import { ListedSecuritiesCard } from "./components/ListedSecuritiesCard";
import { PortfolioSummary } from "./components/PortfolioSummary";
import { useGetChartData } from "./hooks/useGetChartData";
import { useSecuritiesSummary } from "./hooks/useSecuritiesSummary";

export const chartRangeOptions = [
  {
    id: "DAYS-7",
    label: "1W",
  },
  {
    id: "MONTHS-1",
    label: "1M",
  },
  {
    id: "MONTHS-3",
    label: "1Q",
  },
  {
    id: "CALYEAR-0",
    label: "YTD",
  },
  {
    id: "GIVEN",
    label: "All",
  },
];

export const OverviewView = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolio(portfolioId);

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Overview} />;
};

const defaultDateFormatting = {
  day: "numeric",
  month: "short",
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

  const { portfolioId } = useParams<{ portfolioId: string }>();

  const chartData = useGetChartData(data);

  const [timeValue, setTimeValue] = useState<Option>({
    id: TimePeriodForGraph["DAYS-7"],
    label: "1W",
  });

  const {
    loading,
    error,
    data: performanceChartData,
  } = useGetPerformance(Number(portfolioId), timeValue.id);

  const breakPortfolioInfoCard = useMatchesBreakpoint("md");

  const {
    Modal,
    onOpen: onMonthlyInvestmentsModalOpen,
    modalProps: monthlyInvestmentsModalProps,
    contentProps: monthlyInvestmentsModalContentProps,
  } = useModal();

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
      <div>
        <Card header="Security type allocation">
          <div className="pt-4 grow min-h-[300px]">
            <PieChart {...chartData} />
          </div>
        </Card>
      </div>
      <div>
        <Card header="Performance chart">
          <div className="pt-4 grow min-h-[300px]">
            {error ? (
              <Center>Something went wrong. please try again.</Center>
            ) : loading ? (
              <Center>
                <Spinner
                  className={classNames(
                    "w-5 h-5 text-primary-400 animate-spin fill-white"
                  )}
                />
              </Center>
            ) : (
              <LineChart
                series={[
                  {
                    name: "Return",
                    data:
                      performanceChartData &&
                      Array.isArray(performanceChartData?.dailyValue)
                        ? performanceChartData.dailyValue.map((data) => ({
                            x: t("dateCustom", {
                              date: dateFromYYYYMMDD(data.date),
                              ...defaultDateFormatting,
                            }),
                            y: data.indexedValue - 100,
                          }))
                        : [],
                  },
                ]}
                detailed
                isPerformanceChart
              />
            )}
          </div>
          <div className="my-2.5 mx-2">
            <ButtonRadio
              value={timeValue}
              onChange={setTimeValue}
              options={chartRangeOptions}
            />
          </div>
          {/* <ButtonGroup
            buttons={Object.values(TimePeriodForGraph).map((time) => ({
              label: getButtonName(time),
              onClick: () => {
                setTimeValue(time);
              },
            }))}
            isLoading={loading}
          /> */}
        </Card>
      </div>
      <div>
        <Card header="Monthly savings">
            <div className="mx-auto pb-2 pt-4 flex flex-col gap-4 items-stretch grow w-[80%]">

              <div className="grid grid-cols-2 divide-x">
                <LabeledDiv
                  label="Next contribution"
                  className="px-2 text-xl font-semibold text-gray-700"
                >
                  100 €
                </LabeledDiv>
                <LabeledDiv
                  label="Due date"
                  className="px-2 text-xl font-semibold text-gray-700"
                >
                  Nov 15
                </LabeledDiv>
              </div>
              <Button
                  /*disabled={amount === 0 || accountsLoading || !isAmountCorrect}
                  isLoading={submitting}*/
                  onClick={onMonthlyInvestmentsModalOpen}
              >
                Modify monthly savings
              </Button>
          </div>
        </Card>
      </div>
      <Modal {...monthlyInvestmentsModalProps} header="Monthly savings">
        <MonthlyInvestmentModal {...monthlyInvestmentsModalContentProps} portfolioMarketValue={data.portfolioReport.marketValue} portfolio={data} />
      </Modal>
    </div>
  );
};
