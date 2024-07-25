import React, { FC } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { FocusOn } from "react-focus-on";
import LoaderSvg from "../../../assets/loader.svg";

const HideBodyOverflow = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

type LoaderProps = React.HTMLAttributes<HTMLDivElement> & {};

export const Loader: FC<LoaderProps> = (props) => (
  <FocusOn>
    <HideBodyOverflow />
    <Mask {...props}>
      <FakeButton />
      <Spinner src={LoaderSvg} />
    </Mask>
  </FocusOn>
);

const Mask = styled.div`
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:before {
    content: "";
    z-index: -1;
    opacity: 0.8;
    background-color: ${({ theme }) => theme.newColors.gray20};
    z-index: 100;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const FakeButton = styled.button`
  // for react-focus-on
  position: absolute;
  right: 100%;
`;

const Spinner = styled.img`
  width: 80px;
  z-index: 102;
  position: fixed;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
  animation: rotate cubic-bezier(0.1, 0.3, 0.8, 0.1) 1s infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
