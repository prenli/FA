import { MutableRefObject, useState } from "react";
import { Select, LabeledDiv, PortfolioSelect, Input, Button } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { usePortfolioSelect } from "hooks/usePortfolioSelect";
import { useCashAccountsSelect } from "../useCashAccountsSelect";

interface DepositModalProps {
  modalInitialFocusRef: MutableRefObject<null>;
  onClose: () => void;
}

export const DepositModalContent = ({
  onClose,
  modalInitialFocusRef,
}: DepositModalProps) => {
  const { t } = useModifiedTranslation();
  const { portfolioId, setPortfolioId, portfolioOptions } =
    usePortfolioSelect();

  const { currentAccount, setCurrentAccount, accountOptions, accountsLoading } =
    useCashAccountsSelect(portfolioId);
  const {
    currency = "EUR",
    currentBalance = 0,
    availableBalance = 0,
  } = currentAccount || {};

  const [amount, setAmount] = useState(0);

  const isAmountCorrect = !isNaN(availableBalance) && amount >= 0;

  const handleDeposit = () => {
    return;
  };

  return (
    <div className="grid gap-2 min-w-[min(84vw,_375px)]">
      <PortfolioSelect
        portfolioOptions={portfolioOptions}
        portfolioId={portfolioId}
        onChange={(newPortfolio) => {
          setPortfolioId(newPortfolio.id);
        }}
        label={t("moneyModal.portfolio")}
      />
      <Select
        value={currentAccount}
        onChange={setCurrentAccount}
        options={accountOptions}
        label={t("moneyModal.toAccount")}
      />
      <div className="grid grid-cols-2 divide-x">
        <LabeledDiv
          label={t("moneyModal.currentBalance")}
          className="text-xl font-semibold text-gray-700"
        >
          {t("numberWithCurrency", {
            value: currentBalance,
            currency: currency,
          })}
        </LabeledDiv>
        <LabeledDiv
          label={t("moneyModal.availableBalance")}
          className="text-xl font-semibold text-right text-gray-700"
        >
          {t("numberWithCurrency", {
            value: availableBalance,
            currency: currency,
          })}
        </LabeledDiv>
      </div>
      <hr className="mb-2" />
      <div className="flex flex-col gap-4 items-stretch ">
        <Input
          ref={modalInitialFocusRef}
          value={amount || ""}
          onChange={(event) => {
            setAmount(Number(event.currentTarget.value));
          }}
          label={t("moneyModal.amountInputLabel", {
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
