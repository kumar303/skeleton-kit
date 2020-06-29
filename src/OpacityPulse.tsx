import styled, { keyframes } from "styled-components";

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
  animation-duration: ${() => `${Math.random() * 1.5 + 2}s`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export default OpacityPulse;
