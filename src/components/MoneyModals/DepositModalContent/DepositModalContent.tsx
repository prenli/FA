import { MutableRefObject, useState } from "react";
import { Input, Button } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { usePortfolioSelect } from "hooks/usePortfolioSelect";
import { useLocalTradeOrders } from "../../../hooks/useLocalTradeOrders";
import { CashAccountSelect } from "../components/CashAccountSelect";
import { usePortfoliosAccountsState } from "../usePortfoliosAccountsState";

interface DepositModalProps {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
}

export const DepositModalContent = ({
  onClose,
  modalInitialFocusRef,
}: DepositModalProps) => {
  const { t } = useModifiedTranslation();
  const portfolioSelectProps = usePortfolioSelect();
  const { portfolioId, portfolioOptions } = portfolioSelectProps;

  const {
    accountsLoading,
    currentExternalAccount,
    setCurrentExternalAccount,
    externalAccounts,
    ...cashAccountSelectProps
  } = usePortfoliosAccountsState(portfolioId);
  const {
    currentCashAccount: { availableBalance = 0, currency = "EUR", label } = {},
  } = cashAccountSelectProps;

  const [amount, setAmount] = useState(0);

  const isAmountCorrect = !isNaN(availableBalance) && amount >= 0;

  const handleDeposit = () => null;
  // const handleDeposit = useLocalTradeOrders("deposit", onClose, {
  //   portfolio: portfolioOptions.find(
  //     (portfolio) => portfolio.id === portfolioId
  //   ),
  //   securityName: label,
  //   currency,
  //   amount: amount,
  // });

  return (
    <div className="grid gap-2 min-w-[min(84vw,_375px)]">
      <CashAccountSelect
        {...cashAccountSelectProps}
        {...portfolioSelectProps}
      />
      <hr className="mb-2" />
      <div className="flex flex-col gap-4 items-stretch ">
        <Input
          ref={modalInitialFocusRef}
          value={amount || ""}
          onChange={(event) => {
            setAmount(Number(event.currentTarget.value));
          }}
          label={t("moneyModal.depositAmountInputLabel", {
            currency: currency,
          })}
          type="number"
          error={
            !isAmountCorrect && !accountsLoading
              ? t("moneyModal.amountInputError")
              : undefined
          }
        />
        <Button
          disabled={amount === 0 || accountsLoading || !isAmountCorrect}
          onClick={handleDeposit}
        >
          {t("moneyModal.depositButtonLabel")}
        </Button>
      </div>
      <hr className="my-1" />
      <div className="text-xs text-center text-gray-600 max-w-[375px]">
        {t("moneyModal.depositDisclaimer")}
      </div>
    </div>
  );
};
