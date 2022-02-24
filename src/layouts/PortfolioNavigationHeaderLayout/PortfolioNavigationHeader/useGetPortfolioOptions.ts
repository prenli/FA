import { useMemo } from "react";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { useTranslation } from "react-i18next";
import { PortfolioOption } from "./PortfolioNavigationHeader";

export const useGetPortfolioOptions = () => {
  const { t } = useTranslation();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();

  const portfolioOptions: PortfolioOption[] = useMemo(() => {
    if (portfolios.length === 1) {
      const portfolio = portfolios[0];
      return [
        {
          id: portfolio.id,
          urlPrefix: `/portfolio/${portfolio.id}`,
          label: `Portfolio ${portfolio.name}`,
        },
      ];
    }

    return [
      { id: 0, urlPrefix: "", label: t("navTab.totalInvestments") },
      ...portfolios.map((portfolio) => ({
        id: portfolio.id,
        urlPrefix: `/portfolio/${portfolio.id}`,
        label: `Portfolio ${portfolio.name}`,
      })),
    ];
  }, [portfolios, t]);

  return portfolioOptions;
};
