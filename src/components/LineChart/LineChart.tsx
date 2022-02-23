import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

interface LineChartProps {
  series: Array<unknown>;
  labels: Array<string>;
  options?: ApexOptions;
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
      color: "#1A56DB",
    },
  },
};

const getLabelPosition = (labels: string[], position: number) =>
  Math.floor((position * (labels.length - 1)) / 3);

export const LineChart = ({ series, labels, options }: LineChartProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Chart
        options={{
          labels,
          ...lineChartDefaultOptions,
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
      />
      <div className="grid relative grid-cols-2 mx-1 text-sm font-medium text-gray-500 min-h-[21px]">
        <div className="text-left">{labels[getLabelPosition(labels, 0)]}</div>
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
        <div className="text-right">{labels[getLabelPosition(labels, 3)]}</div>
      </div>
    </>
  );
};
