import { ReactNode } from "react";
import classNames from "classnames";
import {
  CardWithChartBackground,
  ColorScheme,
} from "./CardWithChartBackground";

interface DataCardProps {
  value: ReactNode;
  label: string;
  colorScheme?: ColorScheme;
}

export const DataCard = ({ value, label, colorScheme }: DataCardProps) => (
  <CardWithChartBackground colorScheme={colorScheme}>
    <div className="relative p-4">
      <div
        className={classNames("text-sm font-normal text-gray-600", {
          "text-gray-300": colorScheme === "black",
        })}
      >
        {label}
      </div>
      <div
        className={classNames("text-3xl font-medium text-gray-900", {
          "text-gray-200": colorScheme === "black",
        })}
      >
        {value}
      </div>
    </div>
  </CardWithChartBackground>
);
