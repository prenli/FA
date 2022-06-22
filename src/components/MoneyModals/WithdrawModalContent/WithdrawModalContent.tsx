import { MutableRefObject, useState } from "react";
import { Select, Input, Button } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { usePortfolioSelect } from "hooks/usePortfolioSelect";
import { useLocalTradeOrders } from "../../../hooks/useLocalTradeOrders";
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
  const portfolioSelectProps = usePortfolioSelect();
  const { portfolioId, portfolioOptions } = portfolioSelectProps;

  const {
    accountsLoading,
    currentExternalAccount,
    setCurrentExternalAccount,
    externalAccounts,
    ...cashAccountSelectProps
  } = usePortfoliosAccountsState(portfolioSelectProps.portfolioId);
  const {
    currentCashAccount: { availableBalance = 0, currency = "EUR", label } = {},
  } = cashAccountSelectProps;

  const [amount, setAmount] = useState(0);

  const isAmountCorrect =
    !isNaN(availableBalance) && amount >= 0 && amount <= availableBalance;

  const handleWithdraw = useLocalTradeOrders("withdrawal", onClose, {
    portfolio: portfolioOptions.find(
      (portfolio) => portfolio.id === portfolioId
    ),
    securityName: label,
    currency,
    amount: amount,
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
          onClick={handleWithdraw}
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
