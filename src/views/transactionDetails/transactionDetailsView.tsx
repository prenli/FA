import { useGetTransactionDetails } from "api/transactions/useGetTransactionDetails";
import { BackNavigationButton, Heading, QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TransactionDetails } from "./components/transactionDetails";

export type TransactionType = "transaction" | "order";

interface TransactionDetailsViewProps {
  id: string | undefined;
  type: TransactionType;
}

// handles view for transaction details and order details
export const TransactionDetailsView = ({
  id,
  type,
}: TransactionDetailsViewProps) => {
  const queryData = useGetTransactionDetails(id);
  const navigate = useNavigate();
  return (
    <div className="flex overflow-hidden flex-col h-full">
      <Heading>
        <BackNavigationButton
          onClick={() => navigate(getNavigationPath(type))}
        />
        <HeaderLabel type={type} />
      </Heading>
      <div className="overflow-y-scroll h-full grow-1">
        <QueryLoadingWrapper
          {...queryData}
          SuccessComponent={TransactionDetails}
        />
      </div>
    </div>
  );
};

export const getNavigationPath = (type: TransactionType) =>
  type === "transaction" ? "../transactions" : "../orders";

interface HeaderLabelProps {
  type: TransactionType;
}

const HeaderLabel = ({ type }: HeaderLabelProps) => {
  const { t } = useTranslation();
  return (
    <>
      {type === "transaction"
        ? t("transactionsPage.header")
        : t("ordersPage.header")}
    </>
  );
};
