import { useState } from "react";
import { MarketHistoryDataPoint } from "api/holdings/types";
import { useGetSecurityMarketDataHistory } from "api/holdings/useGetSecurityMarketDataHistory";
import { LineChart, ButtonRadio, LoadingIndicator, Center } from "components";
import { LineData } from "components/LineChart/LineChart";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { dateFromYYYYMMDD } from "utils/date";

export const chartRangeOptions = [
  {
    id: "DAYS-6",
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
    id: "CALENDYEAR-0",
    label: "All",
    dateFormatting: {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
    },
  },
];

const defaultDateFormatting = {
  month: "short",
  day: "numeric",
};

// apex charts freezes when must draw too many data points chart, we decimate them to prevent this
const safeDPNumber = 300;
const limitDataPoints = (data: MarketHistoryDataPoint[]) => {
  if (safeDPNumber > data.length) {
    return data;
  }
  const decimateRatio = Math.floor(data.length / safeDPNumber);

  return data.filter((dataPoint, index) => index % decimateRatio === 0);
};

export const HoldingHistoryDataChart = () => {
  const { holdingId } = useParams();
  const { t } = useTranslation();
  const [selectedRange, setRange] = useState(chartRangeOptions[0]);
  const isChartDetailed = useMatchesBreakpoint("lg");

  const { loading: securityLoading, data: securityData } =
    useGetSecurityMarketDataHistory(holdingId, selectedRange.id);

  const { marketDataHistory = [] } = securityData || {};

  const preparedMarketData = limitDataPoints(marketDataHistory);

  return (
    <div className="flex flex-col my-2 grow">
      <div className="relative grow">
        {securityLoading && (
          <div className="absolute w-full h-full">
            <LoadingIndicator center />
          </div>
        )}
        {!securityLoading && preparedMarketData.length === 0 && (
          <div className="absolute inset-0">
            <Center>{t("messages.noDataAvailable")}</Center>
          </div>
        )}
        <LineChart
          series={[
            {
              name: "Price",
              data: removeXDuplicates(
                preparedMarketData.map((data) => ({
                  x: t("date", {
                    date: dateFromYYYYMMDD(data.date),
                    ...(selectedRange.dateFormatting || defaultDateFormatting),
                  }),
                  y: data.price,
                }))
              ),
            },
          ]}
          detailed={isChartDetailed}
        />
      </div>
      <div className="my-2.5 mx-2">
        <ButtonRadio
          value={selectedRange}
          onChange={setRange}
          options={chartRangeOptions}
        />
      </div>
    </div>
  );
};

// assuming that data array is sorted
const removeXDuplicates = (seriesDataArray: LineData["data"]) =>
  seriesDataArray.filter((item, index, array) => {
    return !index || item.x !== array[index - 1].x;
  });
