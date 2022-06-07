import { useNavigate } from "react-router";
import { LocalTradeOrderId } from "../../hooks/useTradingState";
import {
  getNavigationPath,
  TransactionType,
} from "../transactionDetails/transactionDetailsView";

export const useNavigateToDetails = (type: TransactionType) => {
  const navigate = useNavigate();

  return (transactionId: number) => {
    if (transactionId !== LocalTradeOrderId) {
      navigate(`${getNavigationPath(type)}/${transactionId}`);
    }
  };
};
