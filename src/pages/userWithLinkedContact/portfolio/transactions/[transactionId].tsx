import { useParams } from "react-router-dom";
import { TransactionDetailsView } from "views/transactionDetails/transactionDetailsView";

export const TransactionDetailsPage = () => {
  const { transactionId } = useParams();

  return <TransactionDetailsView id={transactionId} type="transaction" />;
};
