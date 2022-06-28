import { useGetAllTradeOrders } from "api/orders/useGetAllTradeOrders";
import { useTradingStorage } from "hooks/useTradingStorage";
import { Orders } from "views/orders/orders";

export const OrdersPage = () => {
  const queryData = useGetAllTradeOrders();
  const { getUnhandledOrdersForDateRange } = useTradingStorage();
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
