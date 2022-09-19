import { Dispatch, SetStateAction } from "react";
import { CashAccount } from "api/money/useGetPortfoliosAccounts";
import { ReactComponent as ExclamationIcon } from "assets/exclamation-circle.svg";
import { PortfolioSelect, Select, LabeledDiv } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { PortfolioOption } from "layouts/PortfolioNavigationHeaderLayout/PortfolioNavigationHeader/PortfolioNavigationHeader";

interface CashAccountSelectProps {
  portfolioId: number;
  setPortfolioId: Dispatch<SetStateAction<number>>;
  portfolioOptions: PortfolioOption[];
  currentCashAccount: CashAccount | undefined;
  setCurrentCashAccount: Dispatch<SetStateAction<CashAccount | undefined>>;
  cashAccounts: CashAccount[];
  accountSelectLabel: string;
}

export const CashAccountSelect = ({
  portfolioId,
  setPortfolioId,
  portfolioOptions,
  currentCashAccount,
  setCurrentCashAccount,
  cashAccounts,
  accountSelectLabel,
}: CashAccountSelectProps) => {
  const { t } = useModifiedTranslation();
  const {
    currentBalance = 0,
    availableBalance = 0,
    currency = "EUR",
  } = currentCashAccount || {};

  return (
    <>
      {!portfolioId && 
        <div className="flex justify-center content-center p-4 w-full rounded-lg border border-amber-600 bg-amber-50">
          <ExclamationIcon className="mr-2 stroke-amber-600" />
          <span className="text-amber-600">{t("moneyModal.noPortfolioAvailable")}</span>
        </div>
      }

      <PortfolioSelect
        portfolioOptions={portfolioOptions}
        portfolioId={portfolioId}
        onChange={(newPortfolio) => {
          setPortfolioId(newPortfolio.id);
        }}
        label={t("moneyModal.portfolio")}
      />
      <Select
        value={currentCashAccount}
        onChange={setCurrentCashAccount}
        options={cashAccounts}
        label={accountSelectLabel}
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
    </>
  );
};
