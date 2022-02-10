import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LoadingIndicator } from "./LoadingIndicator";

export default {
  title: "UX/LoadingIndicator",
  component: LoadingIndicator,
} as ComponentMeta<typeof LoadingIndicator>;

const Template: ComponentStory<typeof LoadingIndicator> = () => (
  <LoadingIndicator />
);

export const Example = Template.bind({});
