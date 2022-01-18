import React from "react";
import { useGetTransactionDetails } from "api/transactions/useGetTransactionDetails";
import { BackNavigationButton, Heading, QueryLoadingWrapper } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { TransactionDetails } from "views/transactionDetails/transactionDetails";

export const Transaction = () => {
  const { transactionId } = useParams();
  const queryData = useGetTransactionDetails(transactionId);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <Heading>
        <BackNavigationButton onClick={() => navigate(-1)} />
        Transaction details
      </Heading>
      <div className="flex-1">
        <QueryLoadingWrapper
          {...queryData}
          SuccessComponent={TransactionDetails}
        />
      </div>
    </div>
  );
};
