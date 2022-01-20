import { gql, useQuery } from "@apollo/client";
import { PORTFOLIO_REPORT_HOLDINGS_DETAILS_FIELDS } from "./fragments";
import { PortfolioHoldingDetailsQuery } from "./types";

const HOLDING_DETAILS_QUERY = gql`
  ${PORTFOLIO_REPORT_HOLDINGS_DETAILS_FIELDS}
  query GetPortfolioHoldingDetails($portfolioId: Long) {
    portfolio(id: $portfolioId) {
      id
      portfolioReport {
        portfolioId
        ...PortfolioReportHoldingDetailsFields
      }
    }
  }
`;

export const useGetPortfolioHoldingDetails = (
  portfolioId: string | undefined,
  securityCode: string | undefined
) => {
  const { error, data } = useQuery<PortfolioHoldingDetailsQuery>(
    HOLDING_DETAILS_QUERY,
    {
      variables: {
        portfolioId: portfolioId,
      },
      fetchPolicy: "cache-first",
    }
  );

  return {
    error,
    data: data?.portfolio.portfolioReport.holdingPositions.find(
      (holding) => holding.security.securityCode === securityCode
    ),
  };
};
