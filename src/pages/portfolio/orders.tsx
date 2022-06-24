import { useGetPortfolioTradeOrders } from "api/orders/useGetPortfolioTradeOrders";
import { useTradingStorage } from "hooks/useTradingStorage";
import { useParams } from "react-router-dom";
import { Orders } from "views/orders/orders";

export const OrdersPage = () => {
  const { portfolioId } = useParams();
  const queryData = useGetPortfolioTradeOrders(portfolioId);
  const { getUnhandledOrdersForDateRange } = useTradingStorage(portfolioId);
  const { data, startDate, endDate } = queryData;
  const unhandledOrdersFromLocalStorage = getUnhandledOrdersForDateRange(
    data,
    startDate,
    endDate
  );
  const localAndAPIOrders = data && [
    ...data,
    ...unhandledOrdersFromLocalStorage,
  ];

  return <Orders {...queryData} data={localAndAPIOrders} />;
};
