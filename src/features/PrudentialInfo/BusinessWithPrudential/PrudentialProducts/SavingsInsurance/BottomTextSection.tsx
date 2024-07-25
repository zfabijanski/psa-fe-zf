import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PruText from "../../../../../components/UI/PruText/PruText";

const Container = styled.div<Pick<IProps, "bulletColor">>`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30% 1fr;
  justify-items: center;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 30px 0 50px;

    li {
      position: relative;
      margin-bottom: 5px;
    }
  }

  li::before {
    content: "•";
    position: absolute;
    left: -20px;
    font-size: 20px;
    color: ${({ bulletColor, theme }) =>
      bulletColor === "emerald"
        ? theme.newColors.primary100
        : theme.newColors.gray100};
    @media only screen and (max-width: 1280px) {
      top: -4px;
    }
  }

  @media only screen and (max-width: 1280px) {
    li span {
      font-size: 14px;
    }
  }
`;

const Title = styled.div<Pick<IProps, "titleColor">>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  span {
    width: 100%;
    text-align: center;
    color: ${({ titleColor, theme }) =>
      titleColor === "emerald"
        ? theme.newColors.primary100
        : theme.newColors.gray100};
  }

  @media only screen and (max-width: 1280px) {
    padding-top: 0;
    span {
      padding: 5px;
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 1024px) {
    white-space: pre-wrap;
    padding-top: 10px;
  }
`;

type Color = "black" | "emerald";

interface IProps {
  title: string;
  bullets: string[];
  titleColor?: Color;
  bulletColor?: Color;
}

const BottomTextSection: FC<IProps> = ({
  title,
  bullets,
  titleColor,
  bulletColor,
}) => {
  return (
    <Container bulletColor={bulletColor}>
      <Title titleColor={titleColor}>
        <PruText fontSize={26}>
          <FormattedMessage id={title} />
        </PruText>
      </Title>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>
            <PruText fontWeight={"600"} fontSize={16}>
              <FormattedMessage id={bullet} />
            </PruText>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default BottomTextSection;
