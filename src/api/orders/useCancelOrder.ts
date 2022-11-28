import { ApolloError, FetchResult, gql, useMutation, useApolloClient } from "@apollo/client";
import { OrderMutationResponse } from "api/orders/types"
import { TRADE_ORDERS_QUERY } from "api/orders/useGetAllTradeOrders";
import { useGetTradeOrder } from "api/orders/useGetTradeOrderById";
import { OrderStatus } from "api/transactions/types";
//import { OrderStatus } from "api/transactions/types";
import { TRANSACTION_DETAILS_QUERY } from "api/transactions/useGetTransactionDetails"
import { useLocalStorageStore } from "hooks/useLocalStorageStore"
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { toast } from "react-toastify";
import {
  isPortfolioAllowedToCancelOrder,
  isTradeOrderCancellable,
  isTradeOrderCancelled
} from "services/permissions/cancelOrder";
import { ORDER_STATUS } from "./enums"

const CANCEL_ORDER_MUTATION = gql`
  mutation cancelOrder($portfolioShortName: String, $extId: String, $reference: String) {
    importTradeOrder(
      tradeOrder: {
        parentPortfolio: $portfolioShortName, 
        extId: $extId,
        reference: $reference,
        status:"${ORDER_STATUS.Cancelled}"
      }
    )
  }
`;

interface CancelOrderQueryProps {
  orderId: number;
  reference?: string;
}

interface CancelOrderQueryVariables {
  extId?: string;
  reference?: string;
  portfolioShortName: string;
}

export const useCancelOrder = (cancelledTradeOrder: CancelOrderQueryProps) => {
  const { t } = useModifiedTranslation();
  const [cancelOrderInFA] = useMutation<
    OrderMutationResponse,
    CancelOrderQueryVariables
  >(CANCEL_ORDER_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        id: `Transaction:${orderId}`, //id is not returned from order mutation
        fields: {
          orderStatus(cachedStatus: OrderStatus) {
            return data?.importTradeOrder[1]["o.status"] as OrderStatus
          },
        },
        broadcast: false, //prevent automatic query refresh
      });
    }
  }
  );

  const { orderId, reference } = cancelledTradeOrder

  const {
    getData,
  } = useGetTradeOrder(orderId)

  const [orders, setOrders] = useLocalStorageStore();
  const apolloClient = useApolloClient()

  const handleOrderCancel = async () => {
    try {

      //trade order in FA
      const faResponse = await getData()
      const tradeOrderInFA = faResponse.data?.transaction

      //trade order in local storage "tradingStorage"
      //this is a separate 'cache' where Pending orders are kept (that have not been created in FA yet) 
      const tradeOrderInTradingStorage = reference && orders.find(order => order.reference === reference)
      const tradeOrder = tradeOrderInFA ?? tradeOrderInTradingStorage

      if (tradeOrder) {

        if (isTradeOrderCancelled(tradeOrder)) {
          toast.error(t("messages.orderAlreadyCancelled"), { autoClose: 5000 });
          await apolloClient.refetchQueries({ include: [TRADE_ORDERS_QUERY, TRANSACTION_DETAILS_QUERY] })
          return //exit
        }

        if (
          !isTradeOrderCancellable(tradeOrder) ||
          !isPortfolioAllowedToCancelOrder(tradeOrder.parentPortfolio)
        ) {
          toast.error(t("messages.orderCancelFailed"), { autoClose: 5000 });
          await apolloClient.refetchQueries({ include: [TRADE_ORDERS_QUERY, TRANSACTION_DETAILS_QUERY] })
          return //exit
        }

        //instruct FA to cancel the order
        const apiResponse = await cancelOrderInFA({
          variables: {
            extId: tradeOrder.extId,
            reference: tradeOrder.reference,
            portfolioShortName: tradeOrder.parentPortfolio.shortName,
          }
        })

        //this will throw an error if something went bad
        handleCancelFailed(apiResponse);

        toast.success(t("messages.orderCancelSuccess"), { autoClose: 3000 });

        if (tradeOrderInTradingStorage) {
          //update its orderStatus in the tradingStorage
          tradeOrderInTradingStorage.orderStatus = ORDER_STATUS.Cancelled
          const filteredOrders = orders.filter(order => order.reference !== reference)
          setOrders([...filteredOrders, tradeOrderInTradingStorage])
        }

      } else {
        //didn't find a trade order to cancel
        toast.error(t("messages.orderCancelFailed"), { autoClose: 5000 });
        await apolloClient.refetchQueries({ include: [TRADE_ORDERS_QUERY, TRANSACTION_DETAILS_QUERY] })
      }

    } catch (e: unknown) {
      const error = e as Error | ApolloError;
      toast.error(error.message, {
        style: { whiteSpace: "pre-line" }
      });
    }
  };

  return { handleOrderCancel };
};

const handleCancelFailed = (
  apiResponse: FetchResult<
    OrderMutationResponse,
    Record<string, unknown>,
    Record<string, unknown>
  >
) => {
  if (!apiResponse.data || !apiResponse.data.importTradeOrder?.[0]) {
    throw new Error("Empty response");
  }

  if (apiResponse.data.importTradeOrder[0].importStatus === "ERROR") {
    let errorMessage = "Bad request: \n";
    Object.entries(apiResponse.data.importTradeOrder[0]).forEach(
      ([key, value]) => {
        if (value.includes("ERROR") && key !== "importStatus") {
          errorMessage += `${key}: ${value}; \n`;
        }
      }
    );
    throw new Error(errorMessage);
  }
};