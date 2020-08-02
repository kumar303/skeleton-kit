import styled, { keyframes } from "styled-components";

// TODO: make opacity configurable.
// This requires return keyframes from a function so that
// it can access the theme through a function argument.
// https://github.com/styled-components/styled-components/issues/397
const pulseOpacity = keyframes`
  0% {
    opacity: 0.2;
  }

  25% {
    opacity: 0.1;
  }

  50% {
    opacity: 0.25;
  }

  75% {
    opacity: 0.1;
  }

  100% {
    opacity: 0.2;
  }
`;

const OpacityPulse = styled.span`
  animation: ${pulseOpacity} infinite cubic-bezier(0.65, 0.05, 0.36, 1);
  animation-duration: ${(props) => {
    const max = props.theme.skeletonKit.loopDurationMaxSec;
    const min = props.theme.skeletonKit.loopDurationMinSec;
    const range = max - min;
    if (range < 0) {
      throw new Error(
        `loopDurationMinSec (${min}) cannot be greater than loopDurationMax (${max})`
      );
    }

    return `${Math.random() * range + min}s`;
  }};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export default OpacityPulse;
