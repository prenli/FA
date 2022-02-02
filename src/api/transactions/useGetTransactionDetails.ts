import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";
import { TRANSACTION_DETAILS_FIELDS, TRANSACTION_FIELDS } from "./fragments";
import { TransactionDetailsQuery } from "./types";

const TRANSACTION_DETAILS_QUERY = gql`
  ${TRANSACTION_FIELDS}
  ${TRANSACTION_DETAILS_FIELDS}
  query GetTransactionDetails($transactionId: Long) {
    transaction(id: $transactionId) {
      ...TransactionsFields
      ...TransactionDetailsFields
    }
  }
`;

export const useGetTransactionDetails = (transactionId: string | undefined) => {
  const { loading, error, data } = useQuery<TransactionDetailsQuery>(
    TRANSACTION_DETAILS_QUERY,
    {
      variables: {
        transactionId,
      },
      ...getFetchPolicyOptions(`useGetTransactionDetails.${transactionId}`),
    }
  );

  return { loading, error, data: data?.transaction };
};
