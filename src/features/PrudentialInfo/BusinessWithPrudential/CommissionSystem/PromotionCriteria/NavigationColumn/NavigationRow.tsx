import React, { FC } from "react";
import styled from "styled-components/macro";
import TextContainer from "../../../../commons/TextContainer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  align-items: center;
  span {
    text-align: right;
  }
`;

interface IProps {
  label: string;
  icon: string;
}

const NavigationRow: FC<IProps> = ({ label, icon }) => {
  return (
    <Container>
      <TextContainer fontSize={18} fontWeight={"700"} translationKey={label} />
      <img src={icon} alt={label} />
    </Container>
  );
};

export default NavigationRow;
