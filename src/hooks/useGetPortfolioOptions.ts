import { useMemo } from "react";
import { Portfolio, useGetContactInfo } from "api/initial/useGetContactInfo";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { PortfolioOption } from "../layouts/PortfolioNavigationHeaderLayout/PortfolioNavigationHeader/PortfolioNavigationHeader";

export const TOTAL_INVESTMENTS_OPTION_ID = 0;

export const useGetPortfolioOptions = (includeTotal = true) => {
  const { t } = useModifiedTranslation();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();

  const portfolioOptions: (PortfolioOption & { details?: Portfolio })[] =
    useMemo(() => {
      if (portfolios.length === 1) {
        const portfolio = portfolios[0];
        return [getPortfolioOption(portfolio)];
      }

      const predefinedOptions =
        includeTotal && portfolios.length !== 0
          ? [
              {
                id: TOTAL_INVESTMENTS_OPTION_ID,
                urlPrefix: "",
                label: t("navTab.totalInvestments"),
              },
            ]
          : [];

      return [
        ...predefinedOptions,
        ...portfolios.map((portfolio) => getPortfolioOption(portfolio)),
      ];
    }, [portfolios, t, includeTotal]);

  return portfolioOptions;
};

const getPortfolioOption = (portfolio: Portfolio) => ({
  id: portfolio.id,
  urlPrefix: `/portfolio/${portfolio.id}`,
  label: portfolio.name,
  details: portfolio,
});
