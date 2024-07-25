import React from "react";
import styled from "styled-components/macro";
import { useIntl } from "react-intl";
import { Icon, TIconType } from "./Icon";
import { TypoH4 } from "./typography";

export interface IAddSectionButtonProps {
  className?: string;
  textTrKey: string;
  buttonText?: string;
  buttonIconName?: TIconType;
  onClick: () => void;
}

export const AddSectionButton: React.FC<IAddSectionButtonProps> = (props) => {
  const intl = useIntl();

  return (
    <Wrapper className={props.className} onClick={props.onClick}>
      <StyledTypoH4>{intl.formatMessage({ id: props.textTrKey })}</StyledTypoH4>
      <Separator />
      <CustomButton>
        {intl.formatMessage({ id: props.buttonText! })}
        <CustomButtonIcon width={20} name={props.buttonIconName!} />
      </CustomButton>
    </Wrapper>
  );
};

AddSectionButton.defaultProps = {
  buttonText: "common.add",
  buttonIconName: "plus",
};

const StyledTypoH4 = styled(TypoH4)`
  color: ${({ theme }) => theme.newColors.primary100};
`;

const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.newColors.primary100};
  flex: 1;
  min-width: 200px;
  margin: 0 12px;
`;

const CustomButton = styled.div`
  background-color: ${({ theme }) => theme.newColors.white100};
  border: 2px solid ${({ theme }) => theme.newColors.primary100};
  color: ${({ theme }) => theme.newColors.primary100};
  padding: 0 24px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`;

const CustomButtonIcon = styled(Icon)`
  margin-left: 12px;

  svg g {
    &,
    path,
    circle,
    rect {
      stroke: ${({ theme }) => theme.newColors.primary100} !important;
    }

    rect {
      fill: ${({ theme }) => theme.newColors.primary100} !important;
    }

    tspan {
      stroke: transparent !important;
      fill: ${({ theme }) => theme.newColors.primary100} !important;
    }
  }

  svg > path {
    stroke: ${({ theme }) => theme.newColors.primary100} !important;
  }
`;

const Wrapper = styled.div<{ justify?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;

  &:hover:not(:active) {
    ${StyledTypoH4} {
      color: ${({ theme }) => theme.newColors.gray100};
    }

    ${Separator} {
      background-color: ${({ theme }) => theme.newColors.gray100};
    }

    ${CustomButton} {
      border-color: ${({ theme }) => theme.newColors.gray100};
      color: ${({ theme }) => theme.newColors.gray100};
    }

    ${CustomButtonIcon} {
      svg g {
        &,
        path,
        circle,
        rect {
          stroke: ${({ theme }) => theme.newColors.gray100} !important;
        }

        rect {
          fill: ${({ theme }) => theme.newColors.gray100} !important;
        }

        tspan {
          stroke: transparent !important;
          fill: ${({ theme }) => theme.newColors.gray100} !important;
        }
      }

      svg > path {
        stroke: ${({ theme }) => theme.newColors.gray100} !important;
      }
    }
  }

  &:active {
    ${CustomButton} {
      background-color: ${({ theme }) => theme.newColors.primary10};
    }
  }
`;
