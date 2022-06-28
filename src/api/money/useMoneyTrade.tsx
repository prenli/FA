import { useState } from "react";
import { ApolloError, FetchResult, gql, useMutation } from "@apollo/client";
import {
  LocalTradeOrderDetails,
  useLocalTradeStorageMutation,
} from "hooks/useLocalTradeStorageMutation";
import { useUniqueReference } from "hooks/useUniqueReference";
import { Slide, toast } from "react-toastify";

// temporary we use importTradeOrder mutation, in the future it will be done with importTransaction
const IMPORT_MONEY_TRADE_MUTATION = gql`
  mutation ImportTransaction(
    $tradeAmount: String
    $currency: String
    $reference: String
    $transactionDate: String
    $transactionTypeCode: String
    $portfolioShortName: String
    $account: String
  ) {
    importTradeOrder(
      tradeOrder: {
        tradeAmount: $tradeAmount
        currency: $currency
        reference: $reference
        transactionDate: $transactionDate
        type: $transactionTypeCode
        parentPortfolio: $portfolioShortName
        account: $account
        status: "4"
      }
    )
  }
`;

interface ImportTransactionQueryVariables {
  currency: string;
  portfolioShortName: string;
  reference: string;
  account: string;
  tradeAmount: number;
  transactionDate: Date;
  transactionTypeCode: string;
}

const errorStatus = "ERROR" as const;

interface ImportTransactionQueryResponse {
  importTradeOrder: ({
    importStatus: "OK" | typeof errorStatus;
  } & unknown)[];
}

export type TradeType = "withdrawal" | "deposit";

export const useMoneyTrade = (
  newTransaction: Omit<
    ImportTransactionQueryVariables,
    | "transactionTypeCode"
    | "transactionDate"
    | "reference"
    | "portfolioShortName"
  > &
    Omit<LocalTradeOrderDetails, "tradeType" | "reference"> & {
      tradeType: TradeType;
    }
) => {
  const [submitting, setSubmitting] = useState(false);
  const [handleAPITrade] = useMutation<
    ImportTransactionQueryResponse,
    ImportTransactionQueryVariables
  >(IMPORT_MONEY_TRADE_MUTATION, {
    refetchQueries: ["GetAllPortfoliosTradeOrders", "GetPortfolioTradeOrders"],
  });

  const saveToLocalTradeOrders = useLocalTradeStorageMutation();
  const getUniqueReference = useUniqueReference();

  const handleTrade = async () => {
    setSubmitting(true);
    try {
      const { tradeType, portfolio, account } = newTransaction;
      if (!portfolio || !account) {
        return;
      }
      const transactionReference = getUniqueReference();

      const apiResponse = await handleAPITrade({
        variables: {
          ...newTransaction,
          transactionDate: new Date(),
          transactionTypeCode: getTradeTypeForAPI(tradeType),
          reference: transactionReference,
          portfolioShortName: portfolio.shortName,
        },
      });

      handleBadAPIResponse(apiResponse);

      await saveToLocalTradeOrders({
        ...newTransaction,
        reference: transactionReference,
      });

      setSubmitting(false);
      return apiResponse;
    } catch (e: unknown) {
      const error = e as Error | ApolloError;
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
        autoClose: false,
        style: { whiteSpace: "pre-line" },
      });
      setSubmitting(false);
      return null;
    }
  };

  return { handleTrade, submitting };
};

const handleBadAPIResponse = (
  apiResponse: FetchResult<
    ImportTransactionQueryResponse,
    Record<string, unknown>,
    Record<string, unknown>
  >
) => {
  if (!apiResponse.data || !apiResponse.data.importTradeOrder?.[0]) {
    throw new Error("Empty response");
  }

  if (apiResponse.data.importTradeOrder[0].importStatus === errorStatus) {
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

const getTradeTypeForAPI = (tradeType: TradeType) => {
  switch (tradeType) {
    case "withdrawal": {
      return "WD";
    }
    case "deposit": {
      return "DEP";
    }
    default: {
      throw new Error("Impossible API money trade type");
    }
  }
};
