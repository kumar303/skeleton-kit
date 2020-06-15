import React from "react";

function Welcome() {
  return <div>TODO: add a welcome screen</div>;
}

export default {
  title: "Welcome",
  component: Welcome,
};

export const ToStorybook = () => <Welcome />;

ToStorybook.story = {
  name: "to Storybook",
};
