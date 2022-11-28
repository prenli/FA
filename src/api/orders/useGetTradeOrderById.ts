import { gql, useLazyQuery } from "@apollo/client";
import { TRADE_ORDERS_DETAILS } from "./fragments";
import { TradeOrderQuery } from "./types";

const TRADE_ORDER_QUERY = gql`
  ${TRADE_ORDERS_DETAILS}
  query GetTradeOrderById(
    $orderId: Long
  ) { 
    transaction(
      id: $orderId
    ) {
      ...TradeOrdersDetails
    }
  }
`;

export const useGetTradeOrder = (
  orderId: number | undefined,
) => {

  const [getData, { loading, error, data, refetch }] = useLazyQuery<TradeOrderQuery>(
    TRADE_ORDER_QUERY,
    {
      variables: {
        orderId,
      },
      fetchPolicy: "no-cache",
    }
  );

  return {
    getData,
    loading,
    error,
    data: data?.transaction,
    refetch
  };
};
