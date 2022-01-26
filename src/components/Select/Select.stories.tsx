import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, Option } from "./Select";

export default {
  title: "UX/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  const [selected, setSelected] = useState<Option>();

  return <Select {...args} value={selected} onChange={setSelected} />;
};

const options: Option[] = [
  { label: "Alice", id: 1 },
  { label: "Bob", id: 2 },
  { label: "Caitlin", id: 3 },
];

export const Example = Template.bind({});
Example.args = {
  options: options,
};
