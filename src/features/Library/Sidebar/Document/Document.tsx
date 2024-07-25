import { MouseEvent } from "react";
import styled from "styled-components";
import { Icon } from "../../../../components/UI/Icon";
import { Theme } from "../../../../theme/theme";
import { DocumentState } from "../../types";

const DocumentBox = styled.div<{ isPreviewed: boolean }>`
  width: 100%;
  padding: 16px 60px 16px 16px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 70px;
  border: 1px solid ${({ theme }) => theme.newColors.gray40};
  box-shadow: ${({ isPreviewed, theme }) =>
    isPreviewed && `inset 0 0 0px 1px ${theme.newColors.primary100}`};
  border-color: ${({ theme, isPreviewed }) =>
    isPreviewed ? theme.newColors.primary100 : theme.newColors.gray40};

  &:focus,
  &:hover {
    & > .document-box-background {
      opacity: ${({ theme }) => theme.opacityHover};
    }
  }

  p {
    font-size: 16px;
    line-height: 20px;
    z-index: 10;
    color: ${({ theme }) => theme.newColors.gray100};
    margin: 0;
  }
`;

const DocumentIcon = styled(Icon)`
  cursor: default;
  position: absolute;
  right: 10px;
  height: 24px;
  top: 50%;
  transform: translateY(-50%);
`;

const ChangingIcon = styled(DocumentIcon)<Pick<IProps, "isStateChanging">>`
  cursor: ${({ isStateChanging }) =>
    isStateChanging ? "not-allowed" : "pointer"};
`;

const AttachedIcon = styled(ChangingIcon)`
  & path {
    fill: ${({ theme }: { theme: Theme }) => theme.newColors.error};
  }
`;

interface IProps {
  name: string;
  state: DocumentState;
  isStateChanging: boolean;
  onPreviewClick: () => void;
  onActionClick: () => void;
  isPreviewed: boolean;
}

const Document = (props: IProps) => {
  const handleActionClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!props.isStateChanging) {
      props.onActionClick();
    }
  };

  const actionButtons = {
    [DocumentState.AttachedPermanently]: (
      <DocumentIcon name="mail" color="gray60" />
    ),
    [DocumentState.Attached]: (
      <AttachedIcon
        name="mail-x"
        isStateChanging={props.isStateChanging}
        onClick={handleActionClick}
      />
    ),
    [DocumentState.NotAttached]: (
      <ChangingIcon
        name="mail"
        isStateChanging={props.isStateChanging}
        onClick={handleActionClick}
        color="primary80"
      />
    ),
  };

  return (
    <DocumentBox onClick={props.onPreviewClick} isPreviewed={props.isPreviewed}>
      <p>{props.name}</p>
      {actionButtons[props.state]}
    </DocumentBox>
  );
};

export default Document;
