import { useGetTradebleSecurities } from "api/trading/useGetTradebleSecurities";
import { QueryLoadingWrapper } from "components";
import { TradableSecuritiesList } from "./components/TradableSecuritiesList";

export const TradingView = () => {
  const queryData = useGetTradebleSecurities();

  return (
    <QueryLoadingWrapper
      {...queryData}
      SuccessComponent={TradableSecuritiesList}
    />
  );
};
