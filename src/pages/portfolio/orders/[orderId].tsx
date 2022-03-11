import { useParams } from "react-router-dom";
import { TransactionDetailsView } from "views/transactionDetails/transactionDetailsView";

export const OrderDetailsPage = () => {
  const { orderId } = useParams();

  return <TransactionDetailsView id={orderId} type="order" />;
};
