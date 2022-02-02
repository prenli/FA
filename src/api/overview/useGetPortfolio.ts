import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { DETAILED_PORTFOLIO_FIELDS } from "./fragments";
import { PortfolioQuery } from "./types";

const PORTFOLIO_QUERY = gql`
  ${DETAILED_PORTFOLIO_FIELDS}
  query GetPortfolio($portfolioId: Long) {
    portfolio(id: $portfolioId) {
      id
      ...DetailedPortfolioFields
    }
  }
`;

export const useGetPortfolio = (portfolioId: string | undefined) => {
  const { loading, error, data } = useQuery<PortfolioQuery>(PORTFOLIO_QUERY, {
    variables: {
      portfolioId,
    },
    ...getFetchPolicyOptions(`useGetPortfolio.${portfolioId}`),
  });

  return { loading, error, data: data?.portfolio };
};
