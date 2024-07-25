import React from "react";
import styled, { CSSProp } from "styled-components";
import { FormattedMessage } from "react-intl";
import { textEllipsis } from "../../../theme/textEllipsis";
import PruIcon from "../../../components/UI/PruIcon/PruIcon";
import { Icon } from "../../../components/UI/Icon";

interface IHeaderText {
  position: "start" | "center" | "end";
}

const HeaderWrapper = styled.div.attrs({
  role: "header",
})`
  display: grid;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  min-height: 80px;
  grid-template-columns: 1fr min-content 1fr;
  background-color: ${({ theme }) => theme.newColors.white100};
  padding: 0 48px;
  border-bottom: 1px solid ${({ theme }) => theme.newColors.gray30};
`;

const HeaderText = styled.div<{ css?: CSSProp }>`
  color: ${({ theme }) => theme.newColors.gray100};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin: 0 12px;
  ${textEllipsis};
  ${(props) => props.css};
`;

const HeaderLabel = styled.div`
  color: ${({ theme }) => theme.newColors.gray60};
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const PositionContainer = styled.div<IHeaderText>`
  justify-self: ${({ position }) => position};
  display: grid;
`;

const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.newColors.gray10};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.newColors.gray40};
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.inset1};
  }
`;

export interface IHeaderProps {
  pageName?: string;
  clientName?: string;
  agentName?: string;
  onLogoutClick?: () => void;
  onHomeClick?: () => void;
  navigationHidden?: boolean;
}

export const Header: React.FC<IHeaderProps> = (props) => (
  <HeaderWrapper>
    <PositionContainer position="start">
      {!props.navigationHidden && (
        <IconTextContainer>
          <IconWrapper>
            <Icon
              name="home"
              onClick={props.onHomeClick}
              data-testid="home-icon"
            />
          </IconWrapper>
          {props.pageName && (
            <HeaderText>
              <HeaderLabel>
                <FormattedMessage id={"start.psao"} />
              </HeaderLabel>
              {props.pageName}
            </HeaderText>
          )}
        </IconTextContainer>
      )}
    </PositionContainer>
    <PruIcon type="logo" />
    <PositionContainer position="end">
      {!props.navigationHidden && (
        <IconTextContainer>
          <HeaderText css={{ textAlign: "right" }}>
            {props.clientName ? (
              <>
                <HeaderLabel>
                  <FormattedMessage id="start.meetingWith" />
                </HeaderLabel>
                {props.clientName}
              </>
            ) : (
              props.agentName
            )}
          </HeaderText>
          <IconWrapper>
            <Icon name="logout" onClick={props.onLogoutClick} />
          </IconWrapper>
        </IconTextContainer>
      )}
    </PositionContainer>
  </HeaderWrapper>
);

export default Header;
