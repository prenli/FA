import { useGetTransactionDetails } from "api/transactions/useGetTransactionDetails";
import { BackNavigationButton, Heading, QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { TransactionDetails } from "./components/transactionDetails";

export const TransactionDetailsView = () => {
  const { transactionId } = useParams();
  const queryData = useGetTransactionDetails(transactionId);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex overflow-hidden flex-col h-full">
      <Heading>
        <BackNavigationButton onClick={() => navigate("../transactions")} />
        {t("transactionsPage.header")}
      </Heading>
      <div className="overflow-y-scroll grow-1">
        <QueryLoadingWrapper
          {...queryData}
          SuccessComponent={TransactionDetails}
        />
      </div>
    </div>
  );
};
