import React from "react";
import styled from "styled-components";

import Phrase from "../src/Phrase";
import Text from "../src/Text";

const Grid = styled.div`
  // TODO: Move this, probably.
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    border: 1px dotted lightgray;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  h1 {
    line-height: 1.5;
    margin: 0 0 1.5rem;
  }

  p {
    line-height: 1.3;
  }
`;

function renderExample({ asSkeleton = false } = {}) {
  return (
    <>
      <h1>
        <Phrase asSkeleton={asSkeleton}>This is a headline</Phrase>
      </h1>
      <h3>
        <Phrase asSkeleton={asSkeleton}>Something else secondary</Phrase>
      </h3>
      <p>
        <Text asSkeleton={asSkeleton}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ex
          felis, ullamcorper at interdum vel, auctor ac magna. Donec non rutrum
          mi. Quisque quis tellus fermentum, pretium est sed, accumsan purus.
        </Text>
      </p>
      <p>
        <Text asSkeleton={asSkeleton}>
          Nulla purus massa, scelerisque in tellus cursus, scelerisque feugiat
          eros. Aenean ut urna sit amet orci luctus vestibulum. Vivamus libero
          dolor, varius eu volutpat et, tempus vel tortor. Praesent ut tortor
          turpis.
        </Text>
      </p>
      <p>
        <Text asSkeleton={asSkeleton}>
          Morbi sit amet arcu ac felis sollicitudin malesuada. Mauris non
          laoreet enim. Integer tortor quam, dapibus non laoreet et, tincidunt
          sed odio.
        </Text>
      </p>
    </>
  );
}

function App() {
  return (
    <Grid>
      <div>{renderExample()}</div>
      <div>{renderExample({ asSkeleton: true })}</div>
    </Grid>
  );
}

export default {
  title: "Text",
  component: App,
};

export const HeadlineWithText = () => <App />;

// export const Emoji = () => (
//   <Button>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
