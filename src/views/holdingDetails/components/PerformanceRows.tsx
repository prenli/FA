import { useGetPerformance } from "api/holdings/useGetPerformance";
import { ReactComponent as Spinner } from "assets/spinner.svg";
import { GainLoseColoring } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useParams } from "react-router-dom";
import { DataRow } from "./DataRow";

export const PerformanceRows = () => {
  const { t } = useModifiedTranslation();
  const { holdingId } = useParams();
  const { data, loading } = useGetPerformance(holdingId);

  return (
    <>
      <DataRow
        label={t("holdingsPage.performance1Y")}
        value={<Performance value={data?.[0]?.performance} loading={loading} />}
      />
      <DataRow
        label={t("holdingsPage.performance3Y")}
        value={<Performance value={data?.[1]?.performance} loading={loading} />}
      />
      <DataRow
        label={t("holdingsPage.performance5Y")}
        value={<Performance value={data?.[2]?.performance} loading={loading} />}
      />
    </>
  );
};

interface PerformanceProps {
  value: number | undefined;
  loading: boolean;
}

export const Performance = ({ value, loading }: PerformanceProps) => {
  const { t } = useModifiedTranslation();
  return (
    <>
      {loading && (
        <Spinner className="w-5 h-5 text-gray-200 animate-spin fill-primary-600" />
      )}
      {!loading && value == null && <span>-</span>}
      {!loading && value != null && (
        <GainLoseColoring value={value}>
          {`${t("number", {
            value: value * 100,
            formatParams: {
              value: {
                signDisplay: "always",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            },
          })}%`}
        </GainLoseColoring>
      )}
    </>
  );
};
