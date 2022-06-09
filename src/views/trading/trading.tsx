import { useGetTradebleSecurities } from "api/trading/useGetTradebleSecurities";
import { Card, QueryLoadingWrapper, Select } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { TradableSecuritiesList } from "./components/TradableSecuritiesList";

export const TradingView = () => {
  const { t } = useModifiedTranslation();
  const { filters, setFilters, filtersOptions, ...queryData } =
    useGetTradebleSecurities();

  return (
    <div className="flex relative flex-col gap-4">
      <Card>
        <div className="grid md:flex grid-cols-2 gap-2 p-2 text-normal">
          <div className="md:w-48">
            <Select
              value={filters.country}
              onChange={(newValue) => setFilters({ country: newValue })}
              options={filtersOptions.country}
              label={t("tradingList.filters.country")}
            />
          </div>
          <div className="md:w-48">
            <Select
              value={filters.type}
              onChange={(newValue) => setFilters({ type: newValue })}
              options={filtersOptions.type}
              label={t("tradingList.filters.type")}
            />
          </div>
        </div>
      </Card>
      <QueryLoadingWrapper
        {...queryData}
        SuccessComponent={TradableSecuritiesList}
      />
    </div>
  );
};
