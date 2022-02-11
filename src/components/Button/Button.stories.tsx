import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";
import { Button } from "./Button";

export default {
  title: "UX/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
  onClick: () => alert("Button clicked"),
};

export const Dark = Template.bind({});
Dark.args = {
  children: "Dark",
  variant: "Dark",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: "Full width",
  isFullWidth: true,
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  children: "Left Icon",
  LeftIcon: DownloadIcon,
};
