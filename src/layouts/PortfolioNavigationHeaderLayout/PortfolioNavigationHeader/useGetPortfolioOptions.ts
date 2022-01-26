import { useMemo } from "react";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { PortfolioOption } from "./PortfolioNavigationHeader";

export const useGetPortfolioOptions = () => {
  const {
    data: { contact: { portfolios } } = { contact: { portfolios: [] } },
  } = useGetContactInfo();

  const portfolioOptions: PortfolioOption[] = useMemo(
    () => [
      { id: 0, urlPrefix: "", label: "All portfolios" },
      ...portfolios.map((portfolio) => ({
        id: portfolio.id,
        urlPrefix: `/portfolio/${portfolio.id}`,
        label: `Portfolio ${portfolio.name}`,
      })),
    ],
    [portfolios]
  );

  return portfolioOptions;
};
