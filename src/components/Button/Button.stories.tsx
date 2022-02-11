import { ComponentStory, ComponentMeta } from "@storybook/react";
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
  leftIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M312 155h91c2.8 0 5-2.2 5-5 0-8.9-3.9-17.3-10.7-22.9L321 63.5c-5.8-4.8-13-7.4-20.6-7.4-4.1 0-7.4 3.3-7.4 7.4V136c0 10.5 8.5 19 19 19z" />
      <path d="M267 136V56H136c-17.6 0-32 14.4-32 32v336c0 17.6 14.4 32 32 32h240c17.6 0 32-14.4 32-32V181h-96c-24.8 0-45-20.2-45-45z" />
    </svg>
  ),
};
