import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { DETAILED_PORTFOLIO_FIELDS } from "./fragments";
import { PortfolioQuery } from "./types";

const PORTFOLIO_QUERY = gql`
  ${DETAILED_PORTFOLIO_FIELDS}
  query GetPortfolio($portfolioId: Long, $locale: Locale) {
    portfolio(id: $portfolioId) {
      id
      ...DetailedPortfolioFields
    }
  }
`;

export const useGetPortfolio = (portfolioId: string | undefined) => {
  const { i18n } = useModifiedTranslation();
  const { loading, error, data } = useQuery<PortfolioQuery>(PORTFOLIO_QUERY, {
    variables: {
      portfolioId,
      locale: i18n.language,
    },
    ...getFetchPolicyOptions(`useGetPortfolio.${portfolioId}`),
  });

  return { loading, error, data: data?.portfolio };
};
