import React from "react";
import styled, { css } from "styled-components/macro";
import { showModal } from "slices/modal";
import { useAppDispatch } from "../../AppStore";
import { IModalData } from "../../models/Modal";
import { Icon } from "./Icon";

export interface IModalInfoIconProps extends IModalData {
  className?: string;
  width?: number;
  hasDarkBackground?: boolean;
}

export const ModalInfoIcon: React.FC<IModalInfoIconProps> = (props) => {
  const {
    className,
    modalContentTrKey,
    modalContent,
    modalHtml,
    modalButtons,
    width,
    hasDarkBackground,
  } = props;
  const dispatch = useAppDispatch();

  return (
    <Wrapper
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(
          showModal({
            modalContentTrKey,
            modalContent,
            modalButtons,
            modalHtml,
          })
        );
      }}
      data-test="button-modal-info"
    >
      <StyledIcon
        width={width}
        hasDarkBackground={hasDarkBackground}
        name="info"
      />
    </Wrapper>
  );
};

ModalInfoIcon.defaultProps = {
  width: 16,
};

const StyledIcon = styled(Icon)<{ hasDarkBackground?: boolean }>`
  display: block;
  ${({ theme, hasDarkBackground }) =>
    css`
      svg g {
        &,
        path,
        circle,
        rect {
          stroke: ${theme.newColors[
            hasDarkBackground ? "white100" : "primary100"
          ]} !important;
        }

        rect {
          fill: ${theme.newColors[
            hasDarkBackground ? "white100" : "primary100"
          ]} !important;
        }

        tspan {
          stroke: transparent !important;
          fill: ${theme.newColors[
            hasDarkBackground ? "white100" : "primary100"
          ]} !important;
        }
      }

      svg > path {
        stroke: ${theme.newColors[
          hasDarkBackground ? "white100" : "primary100"
        ]} !important;
      }

      &:hover {
        svg g {
          &,
          path,
          circle,
          rect {
            stroke: ${theme.newColors.gray100} !important;
          }

          rect {
            fill: ${theme.newColors.gray100} !important;
          }

          tspan {
            stroke: transparent !important;
            fill: ${theme.newColors.gray100} !important;
          }
        }

        svg > path {
          stroke: ${theme.newColors.gray100} !important;
        }
      }
    `}
`;

const Wrapper = styled.div`
  cursor: pointer;
  display: inline-block;
`;
