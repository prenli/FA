import { GainLoseColoring } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";

interface PerformanceProps {
  value: number;
}

export const Performance = ({ value }: PerformanceProps) => {
  const { t } = useModifiedTranslation();
  return (
    <div className="text-right">
      <GainLoseColoring value={value}>
        {`${t("number", {
          value: value,
          formatParams: {
            value: {
              signDisplay: "always",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          },
        })}%`}
      </GainLoseColoring>
    </div>
  );
};
