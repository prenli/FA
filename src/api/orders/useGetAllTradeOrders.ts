import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "contexts/keycloakContext";
import { TRADE_ORDERS_DETAILS } from "./fragments";
import { AllTradeOrdersQuery } from "./types";

const TRADE_ORDERS_QUERY = gql`
  ${TRADE_ORDERS_DETAILS}
  query GetContact($contactId: Long) {
    contact(id: $contactId) {
      id
      tradeOrders {
        ...TradeOrdersDetails
      }
    }
  }
`;

export const useGetAllTradeOrders = () => {
  const { linkedContact } = useKeycloak();
  const { error, data } = useQuery<AllTradeOrdersQuery>(TRADE_ORDERS_QUERY, {
    variables: {
      contactId: linkedContact,
    },
    fetchPolicy: "cache-and-network",
  });

  return { error, data: data?.contact.tradeOrders };
};
