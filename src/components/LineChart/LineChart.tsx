import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import theme from "tailwindTheme";

interface LineChartProps {
  series: Array<unknown>;
  labels: Array<string>;
  options?: ApexOptions;
  detailed?: boolean;
}

const lineChartColors = {
  fillGradientShade: "light",
  fillGradientShadeIntensity: 1,
};

const lineChartDefaultOptions = {
  chart: {
    fontFamily: "Inter, sans-serif",
    sparkline: {
      enabled: true,
    },
    toolbar: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: lineChartColors.fillGradientShade,
      shadeIntensity: lineChartColors.fillGradientShadeIntensity,
    },
  },
  plotOptions: {
    area: {
      fillTo: "end" as const,
    },
  },
  grid: {
    padding: {
      top: 2,
      bottom: 2,
    },
  },
  theme: {
    monochrome: {
      enabled: true,
      color: theme.colors.primary["600"],
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    tickAmount: 5,
    labels: {
      rotate: 0,
      offsetX: 2,
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
  },
};

export const LineChart = ({
  series,
  labels,
  options,
  detailed = false,
}: LineChartProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Chart
        options={{
          labels,
          ...lineChartDefaultOptions,
          ...(detailed && {
            chart: {
              ...lineChartDefaultOptions.chart,
              sparkline: { enabled: false },
            },
            yaxis: {
              labels: {
                formatter: (value: number) => t("number", { value }),
                style: {
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                },
              },
            },
          }),
          tooltip: {
            style: {
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
            },
            y: {
              formatter: (value: number) => t("number", { value }),
            },
          },
          ...options,
        }}
        series={series}
        type="area"
        height="100%"
      />
      {!detailed && <XLabels labels={labels} />}
    </>
  );
};

const getLabelPosition = (labels: string[], position: number) =>
  Math.floor((position * (labels.length - 1)) / 3);

interface XLabelsProps {
  labels: Array<string>;
}

const XLabels = ({ labels }: XLabelsProps) => {
  if (labels.length <= 2) {
    return <div className="min-h-[21px]" />;
  }

  return (
    <div className="grid relative grid-cols-2 mx-1 text-sm font-medium text-gray-500 min-h-[21px]">
      <div className="text-left">{labels[getLabelPosition(labels, 0)]}</div>
      {labels.length > 3 && (
        <div
          className="absolute "
          style={{
            left: `${
              (100 * getLabelPosition(labels, 1)) / getLabelPosition(labels, 3)
            }%`,
          }}
        >
          <div className="ml-[-50%]">{labels[getLabelPosition(labels, 1)]}</div>
        </div>
      )}
      {labels.length > 2 && (
        <div
          className="absolute "
          style={{
            left: `${
              (100 * getLabelPosition(labels, 2)) / getLabelPosition(labels, 3)
            }%`,
          }}
        >
          <div className="ml-[-50%]">{labels[getLabelPosition(labels, 2)]}</div>
        </div>
      )}
      <div className="text-right">{labels[getLabelPosition(labels, 3)]}</div>
    </div>
  );
};
