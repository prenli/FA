import { useMemo } from "react";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { PortfolioOption } from "./PortfolioNavigationHeader";

export const useGetPortfolioOptions = () => {
  const { t } = useModifiedTranslation();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();

  const portfolioOptions: PortfolioOption[] = useMemo(() => {
    if (portfolios.length === 1) {
      const portfolio = portfolios[0];
      return [getPortfolioOption(portfolio.id, portfolio.name)];
    }

    return [
      { id: 0, urlPrefix: "", label: t("navTab.totalInvestments") },
      ...portfolios.map((portfolio) =>
        getPortfolioOption(portfolio.id, portfolio.name)
      ),
    ];
  }, [portfolios, t]);

  return portfolioOptions;
};

const getPortfolioOption = (id: number, name: string) => ({
  id: id,
  urlPrefix: `/portfolio/${id}`,
  label: name,
});
