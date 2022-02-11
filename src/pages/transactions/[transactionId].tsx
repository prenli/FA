import { useGetTransactionDetails } from "api/transactions/useGetTransactionDetails";
import { BackNavigationButton, Heading, QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { TransactionDetails } from "views/transactionDetails/transactionDetails";

export const Transaction = () => {
  const { transactionId } = useParams();
  const queryData = useGetTransactionDetails(transactionId);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex overflow-hidden flex-col h-full">
      <Heading>
        <BackNavigationButton onClick={() => navigate(-1)} />
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
