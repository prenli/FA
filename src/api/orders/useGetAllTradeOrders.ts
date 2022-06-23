import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "providers/KeycloakProvider";
import { startOfMonth, toShortISOString } from "utils/date";
import { useDateRange } from "../useDateRange";
import { TRADE_ORDERS_DETAILS } from "./fragments";
import { AllTradeOrdersQuery } from "./types";

const TRADE_ORDERS_QUERY = gql`
  ${TRADE_ORDERS_DETAILS}
  query GetContactTradeOrders(
    $contactId: Long
    $startDate: String
    $endDate: String
  ) {
    contact(id: $contactId) {
      id
      tradeOrders(
        transactionStartDate: $startDate
        transactionEndDate: $endDate
      ) {
        ...TradeOrdersDetails
      }
    }
  }
`;

const now = new Date();
const initialRange = {
  start: startOfMonth(now),
  end: now,
};

export const useGetAllTradeOrders = () => {
  const dateRangeProps = useDateRange(initialRange);
  const { startDate, endDate } = dateRangeProps;

  const { linkedContact } = useKeycloak();
  const { loading, error, data } = useQuery<AllTradeOrdersQuery>(
    TRADE_ORDERS_QUERY,
    {
      variables: {
        startDate: toShortISOString(startDate),
        endDate: toShortISOString(endDate),
        contactId: linkedContact,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    loading,
    error,
    data: data?.contact.tradeOrders,
    ...dateRangeProps,
  };
};
