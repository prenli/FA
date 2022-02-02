import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { useKeycloak } from "providers/KeycloakProvider";
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
  const { loading, error, data } = useQuery<AllTradeOrdersQuery>(
    TRADE_ORDERS_QUERY,
    {
      variables: {
        contactId: linkedContact,
      },
      ...getFetchPolicyOptions(`useGetAllTradeOrders.${linkedContact}`),
    }
  );

  return { loading, error, data: data?.contact.tradeOrders };
};
