import { ComponentMeta } from "@storybook/react";
import { PieChart } from "./PieChart";

export default {
  title: "UX/PieChart",
  component: PieChart,
} as ComponentMeta<typeof PieChart>;

export const Example = () => (
  <div className="w-64">
    <PieChart
      series={[10, 20, 30, 40]}
      labels={["Apples", "Oranges", "Bananas", "Grapes"]}
    />
  </div>
);
