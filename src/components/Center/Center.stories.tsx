import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Center } from "./Center";

export default {
  title: "UX/Center",
  component: Center,
} as ComponentMeta<typeof Center>;

const Template: ComponentStory<typeof Center> = (args) => (
  <div className="w-64 h-32 text-yellow-100 bg-yellow-800">
    <Center>{args.children}</Center>
  </div>
);

export const Example = Template.bind({});
Example.args = {
  children: "I am in center",
};
