import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DatePicker } from "./DatePicker";

export default {
  title: "UX/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
  const [value, onChange] = useState<Date>();
  return (
    <div className="bg-white w-fit">
      <DatePicker value={value} onChange={onChange} />
    </div>
  );
};

export const Example = Template.bind({});
