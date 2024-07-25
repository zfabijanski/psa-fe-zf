import { MouseEvent } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import InfoIcon from "assets/icons/information-black-lightgray.svg";
import { formatNumber } from "utils/transformers";
import { Tile } from "../Tile";
import { IHealthProblemData } from "./types";

export interface IHealthProblemTileProps extends IHealthProblemData {
  onClick: () => void;
  onInfoClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export const HealthProblemTile = (props: IHealthProblemTileProps) => {
  return (
    <StyledTile onClick={props.onClick}>
      <Info image={props.image} onClick={props.onInfoClick} src={InfoIcon} />
      <img src={props.image} alt="" />
      <Title>
        <FormattedMessage id={props.title} />
      </Title>
      <FormattedMessage
        id={props.amountText}
        values={{ amount: formatNumber(props.amount) }}
      />
    </StyledTile>
  );
};

const Info = styled.img<Pick<IHealthProblemData, "image">>`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 32px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: ${({ theme }) => theme.opacityHover};
  }

  @media only screen and (max-width: 1024px) {
    width: auto !important;
  }
`;

const Title = styled.span`
  white-space: pre-wrap;
`;

const StyledTile = styled(Tile)`
  padding: 10px 0;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
  }
`;
