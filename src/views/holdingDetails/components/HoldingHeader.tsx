import { useModifiedTranslation } from "hooks/useModifiedTranslation";

interface HoldingHeaderProps {
  currency: string;
  marketValue: number;
}

export const HoldingHeader = ({
  currency,
  marketValue,
}: HoldingHeaderProps) => {
  const { t } = useModifiedTranslation();
  return (
    <div className="flex justify-between items-center">
      <div>{t("holdingsPage.holding")}</div>
      <div className="text-lg font-bold text-right">
        {t("numberWithCurrency", {
          value: marketValue,
          currency,
        })}
      </div>
    </div>
  );
};
