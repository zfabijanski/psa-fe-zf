import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PruText from "../../../components/UI/PruText/PruText";

const Container = styled.div<Pick<IProps, "align">>`
  width: 150px;
  display: grid;
  grid-template-rows: 150px 1fr;
  align-self: ${({ align }) => align};

  & > div {
    display: flex;
    justify-content: center;
  }

  span {
    text-align: center;
  }

  @media only screen and (max-width: 1280px) {
    width: 100%;
    grid-template-rows: 120px 1fr;
    justify-content: center;
    img {
      height: 100%;
      width: 100%;
    }
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    grid-template-rows: 100px 1fr;

    img {
      height: 100%;
      width: 100%;
    }
  }
`;

interface IProps {
  text: string;
  icon: string;
  align: "start" | "end";
  className?: string;
}

const GridItem: FC<IProps> = (props) => {
  return (
    <Container align={props.align} className={props.className}>
      <img src={props.icon} alt={props.text} />
      <div>
        <PruText fontWeight={"600"} fontSize={16}>
          <FormattedMessage id={props.text} />
        </PruText>
      </div>
    </Container>
  );
};

export default GridItem;
