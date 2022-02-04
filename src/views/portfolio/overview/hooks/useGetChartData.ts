import { useMemo } from "react";
import { DetailedPortfolio } from "api/overview/types";

export const useGetChartData = (data: DetailedPortfolio) => {
  return useMemo(
    () => ({
      series: data.analytics.allocationTopLevel.allocationByType.map(
        (typeData) => typeData.figures.shareOfTotal * 100
      ),
      labels: data.analytics.allocationTopLevel.allocationByType.map(
        (typeData) => typeData.name
      ),
    }),
    [data]
  );
};
