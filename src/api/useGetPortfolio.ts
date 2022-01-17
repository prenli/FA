import { gql, useQuery } from "@apollo/client";
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
  const { error, data } = useQuery<PortfolioQuery>(PORTFOLIO_QUERY, {
    variables: {
      portfolioId: portfolioId,
    },
    fetchPolicy: "cache-and-network",
  });

  return { error, data: data?.portfolio };
};
