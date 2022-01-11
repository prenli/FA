import { useMemo } from "react";
import { SecurityPosition } from "api/types";

export const useSecuritiesSummary = (securities: SecurityPosition[]) => {
  const topSecurities = useMemo(() => {
    return getTopSecurities(securities);
  }, [securities]);

  const worstSecurities = useMemo(() => {
    return getWorstSecurities(securities);
  }, [securities]);

  return { topSecurities, worstSecurities };
};

const getTopSecurities = (positions: SecurityPosition[]) =>
  [...positions]
    .sort(function (a, b) {
      return b.valueChangeAbsolute - a.valueChangeAbsolute;
    })
    .slice(0, 3);

const getWorstSecurities = (positions: SecurityPosition[]) =>
  [...positions]
    .sort(function (a, b) {
      return a.valueChangeAbsolute - b.valueChangeAbsolute;
    })
    .slice(0, 3);
