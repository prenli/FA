import { MutableRefObject, useState } from "react";
import { Select, Input, Button } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { usePortfolioSelect } from "hooks/usePortfolioSelect";
import { useGetContactInfo } from "../../../api/initial/useGetContactInfo";
import { useMoneyTrade } from "../../../api/money/useMoneyTrade";
import { CashAccountSelect } from "../components/CashAccountSelect";
import { usePortfoliosAccountsState } from "../usePortfoliosAccountsState";

interface WithdrawModalProps {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
}

export const WithdrawModalContent = ({
  onClose,
  modalInitialFocusRef,
}: WithdrawModalProps) => {
  const { t } = useModifiedTranslation();
  const { data: { portfolios } = { portfolios: [] } } = useGetContactInfo();
  const portfolioSelectProps = usePortfolioSelect();
  const { portfolioId } = portfolioSelectProps;

  const {
    accountsLoading,
    currentExternalAccount,
    setCurrentExternalAccount,
    externalAccounts,
    ...cashAccountSelectProps
  } = usePortfoliosAccountsState(portfolioId);
  const {
    currentCashAccount: {
      availableBalance = 0,
      currency = "EUR",
      label = "",
      number = "",
    } = {},
  } = cashAccountSelectProps;

  const [amount, setAmount] = useState(0);

  const isAmountCorrect =
    !isNaN(availableBalance) && amount >= 0 && amount <= availableBalance;

  const { handleTrade: handleWithdraw, submitting } = useMoneyTrade({
    tradeType: "withdrawal",
    portfolio:
      portfolios.find((portfolio) => portfolio.id === portfolioId) ||
      portfolios[0],
    tradeAmount: amount,
    securityName: label,
    account: number,
    currency,
  });

  return (
    <div className="grid gap-2 min-w-[min(84vw,_375px)]">
      <CashAccountSelect
        {...cashAccountSelectProps}
        {...portfolioSelectProps}
      />
      <hr />
      {currentExternalAccount ? (
        <Select
          value={currentExternalAccount}
          onChange={setCurrentExternalAccount}
          options={externalAccounts}
          label={t("moneyModal.toAccount")}
        />
      ) : (
        <div className="my-2 text-sm text-red-600">
          {t("moneyModal.missingExternalAccountMessage")}
        </div>
      )}
      <div className="flex flex-col gap-4 items-stretch ">
        <Input
          ref={modalInitialFocusRef}
          value={amount || ""}
          onChange={(event) => {
            setAmount(Number(event.currentTarget.value));
          }}
          label={t("moneyModal.withdrawAmountInputLabel", {
            currency,
          })}
          type="number"
          error={
            !isAmountCorrect && !accountsLoading
              ? t("moneyModal.amountInputError")
              : undefined
          }
        />
        <Button
          disabled={
            amount === 0 ||
            accountsLoading ||
            !isAmountCorrect ||
            !currentExternalAccount
          }
          isLoading={submitting}
          onClick={async () => {
            const response = await handleWithdraw();
            if (response) {
              onClose();
            }
          }}
        >
          {t("moneyModal.withdrawButtonLabel")}
        </Button>
      </div>
      <hr className="my-1" />
      <div className="text-xs text-center text-gray-600 max-w-[375px]">
        {t("moneyModal.withdrawDisclaimer")}
      </div>
    </div>
  );
};
