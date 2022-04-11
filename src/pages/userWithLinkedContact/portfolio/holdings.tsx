import { useGetPortfolioHoldings } from "api/holdings/useGetPortfolioHoldings";
import { QueryLoadingWrapper } from "components";
import { useParams } from "react-router-dom";
import { Holdings } from "views/holdings/holdings";

export const HoldingsView = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolioHoldings(portfolioId);

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Holdings} />;
};
