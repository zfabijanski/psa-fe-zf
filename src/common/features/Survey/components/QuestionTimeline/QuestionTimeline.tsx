import styled, { ThemedStyledProps } from "styled-components";
import { Icon, TIconType } from "components/UI/Icon";
import { Theme } from "theme/theme";

export interface QuestionTimelineProps {
  isActive?: boolean;
  isHome?: boolean;
  withIcon?: boolean;
}

const setPrimaryColor =
  (element: "icon" | "bar") =>
  ({
    isActive,
    isHome,
    theme,
  }: ThemedStyledProps<QuestionTimelineProps, Theme>) => {
    if (element === "icon" && isActive && !isHome) {
      return theme.newColors.gray100;
    }
    return isActive ? theme.newColors.primary80 : theme.newColors.primary40;
  };

const setIcon = ({ isActive, isHome }: QuestionTimelineProps): TIconType => {
  if (isHome) {
    return "home";
  }

  if (isActive) {
    return "arrow-right";
  }

  return "check";
};

export const QuestionTimeline = (props: QuestionTimelineProps) => {
  return (
    <QuestionTimelineBar {...props}>
      {props.withIcon && (
        <QuestionTimelineIcon {...props}>
          <Icon name={setIcon(props)} color="white100" width={16} />
        </QuestionTimelineIcon>
      )}
    </QuestionTimelineBar>
  );
};
QuestionTimeline.defaultProps = {
  withIcon: true,
};

const QuestionTimelineBar = styled.div<QuestionTimelineProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  left: 23px;
  border: 1px solid ${setPrimaryColor("bar")};

  ${(props) =>
    props.isActive &&
    props.withIcon &&
    `
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: -1px;
        width: 2px;
        height: 50%;
        background-color: ${props.theme.newColors.gray40};
      }
  `};

  @media (min-width: 1180px) {
    left: 60px;
  }
`;

const QuestionTimelineIcon = styled.div<QuestionTimelineProps>`
  position: absolute;
  top: ${(props) => (props.isHome ? -12 : 0)}px;
  bottom: ${(props) => (props.isHome ? "initial" : 0)};
  left: -12px;
  width: 24px;
  height: 24px;
  background-color: ${setPrimaryColor("icon")};
  color: ${(props) => props.theme.newColors.white100};
  margin: auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
