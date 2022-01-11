import React from "react";
import { useGetAllPortfolios } from "api/useGetAllPortfolios";
import { Holdings } from "views/holdings/holdings";
import { QueryLoadingWrapper } from "../components";

export const HoldingsPage = () => {
  const queryData = useGetAllPortfolios();

  return <QueryLoadingWrapper {...queryData} SuccessComponent={Holdings} />;
};
