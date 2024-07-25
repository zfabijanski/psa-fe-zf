import { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import { Icon, TIconType } from "../../components/UI/Icon";
import PruText from "../../components/UI/PruText/PruText";

export type HoverPathKey = "fill" | "stroke";

interface IProps {
  isLarge?: boolean;
  icon: TIconType;
  label: string;
  onClick: () => void;
  className?: string;
  hoverPathKey?: HoverPathKey;
}

const Tile: FC<IProps> = (props) => {
  return (
    <Container {...props}>
      <PruText>
        <FormattedMessage id={props.label} />
      </PruText>
      <Icon name={props.icon} />
    </Container>
  );
};

export default Tile;

const Container = styled.div<{
  isLarge?: boolean;
  hoverPathKey?: HoverPathKey;
}>`
  margin: 12px auto;
  width: 100%;
  background: #ffffff;
  box-shadow: ${({ theme }) => theme.shadows.elevation2};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  cursor: pointer;
  height: ${(props) => (props.isLarge ? "156px" : "72px")};
  font-size: ${(props) => (props.isLarge ? "32px" : "20px")};
  line-height: ${(props) => (props.isLarge ? "40px" : "24px")};
  position: relative;
  font-weight: 600;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid transparent;
    border-radius: 4px;
  }

  &:hover:not(:active) {
    box-shadow: ${({ theme }) => theme.shadows.elevation3};

    &:after {
      border-color: ${({ theme }) => theme.newColors.secondary100};
    }

    & path,
    & ellipse,
    & rect {
      ${({ theme, hoverPathKey = "stroke" }) => `
        ${hoverPathKey}: ${theme.newColors.secondary100};
      `};
    }

    & span {
      color: ${(props) => props.theme.newColors.secondaryDark};
    }
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.inset1};
  }
`;
