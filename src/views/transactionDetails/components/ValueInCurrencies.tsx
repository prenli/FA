import { useTranslation } from "react-i18next";

interface ValueInCurrenciesProps {
  valueInAccountCurrency: number;
  accountCurrencyCode?: string;
  valueInSecurityCurrency: number;
  securityCurrencyCode: string;
}

export const ValueInCurrencies = ({
  valueInAccountCurrency,
  accountCurrencyCode,
  valueInSecurityCurrency,
  securityCurrencyCode,
}: ValueInCurrenciesProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        {t("numberWithCurrency", {
          value: valueInSecurityCurrency,
          currency: securityCurrencyCode,
        })}
      </div>
      {accountCurrencyCode && securityCurrencyCode !== accountCurrencyCode && (
        <div className="text-sm font-medium leading-none text-gray-500">
          {t("numberWithCurrency", {
            value: valueInAccountCurrency,
            currency: accountCurrencyCode,
          })}
        </div>
      )}
    </>
  );
};
