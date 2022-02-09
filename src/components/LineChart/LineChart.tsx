import React from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface LineChartProps {
  series?: Array<unknown>;
  labels?: Array<string>;
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
      bottom: 2,
      top: 2,
    },
  },
  theme: {
    monochrome: {
      enabled: true,
      color: "#1A56DB",
    },
  },
  tooltip: {
    style: {
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
    },
  },
};

export const LineChart = ({ series, labels, options }: LineChartProps) => (
  <Chart
    options={{ labels, ...lineChartDefaultOptions, ...options }}
    series={series}
    type="area"
  />
);
