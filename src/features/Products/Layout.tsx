import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  top: 80px;
  bottom: 80px;
  left: 0;
  right: 0;
`;

const Container = styled.div`
  max-width: 100%;
  margin: auto;

  padding: 0 48px;
`;

interface IProps {
  showBackdrop: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Layout: React.FC<PropsWithChildren<IProps>> = (props) => (
  <>
    {props.showBackdrop && <Background onClick={props.onClick} />}
    <Container>{props.children}</Container>
  </>
);

export default Layout;
