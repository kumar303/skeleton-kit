import React from "react";

const Welcome: React.FunctionComponent<Record<string, unknown>> = () => {
  return <div>TODO: add a welcome screen</div>;
};

export default {
  title: "Welcome",
  component: Welcome,
};

export const ToStorybook: React.FunctionComponent<Record<
  string,
  unknown
>> = () => <Welcome />;

// @ts-ignore This is a storybook property. TODO: maybe fix this.
ToStorybook.story = {
  name: "to Storybook",
};
