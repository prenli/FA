import { useQuery } from "@apollo/client";
import { PERFORMANCE_PORTFOLIO_INDEXED_VALUE } from "./fragments";
import { PerformanceQuery } from "./types";

export const useGetPerformance = (
  portfolioId: number,
  timePeriod: string | number
) => {
  const { loading, error, data } = useQuery<PerformanceQuery>(
    PERFORMANCE_PORTFOLIO_INDEXED_VALUE,
    {
      variables: {
        portfolioId,
        timePeriod,
      },
    }
  );

  return { loading, error, data: data?.portfolio?.graph?.dailyValues };
};
