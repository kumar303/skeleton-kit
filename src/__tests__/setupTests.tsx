import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// This adds Enzyme matchers to Jest.
import "jest-enzyme";

// This adds styled-components matchers to Jest.
import "jest-styled-components";

Enzyme.configure({ adapter: new Adapter() });
