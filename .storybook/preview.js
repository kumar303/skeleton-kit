import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import EStyleSheet from "react-native-extended-stylesheet";

addDecorator(withKnobs);

// TODO: figure out a better way to do this.
EStyleSheet.build({});
