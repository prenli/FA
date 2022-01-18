import React from "react";
import { useGetAllPortfoliosHoldings } from "api/holdings/useGetAllPortfoliosHoldings";
import { QueryLoadingWrapper } from "components";
import { Holdings } from "views/holdings/holdings";

export const HoldingsPage = () => {
  const queryData = useGetAllPortfoliosHoldings();

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Holdings} />;
};
