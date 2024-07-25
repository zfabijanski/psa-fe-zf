import React from "react";
import styled from "styled-components";
import PruIcon from "components/UI/PruIcon/PruIcon";

interface IProps {
  handleCancel: () => void;
}

const Container = styled.div`
  position: absolute;
  top: 42px;
  right: 48px;
  transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  z-index: 301;

  &:hover {
    opacity: ${({ theme }) => theme.opacityHover};
  }
`;

const CloseIcon: React.FC<IProps> = (props) => (
  <Container>
    <PruIcon onClick={props.handleCancel} type={"close-square"} />
  </Container>
);

export default CloseIcon;
