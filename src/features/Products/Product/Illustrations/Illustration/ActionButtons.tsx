import React, { MouseEvent } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";
import PruIcon from "../../../../../components/UI/PruIcon/PruIcon";
import { OrderIdType } from "../../../types";

const GridWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.newColors.gray60};
  padding: 8px 12px;
`;

const ActionHeading = styled.div`
  color: ${({ theme }) => theme.newColors.gray60};
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 8px;
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
`;

const ActionIcon = styled(PruIcon)<{ danger?: boolean }>`
  img {
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 2px;
    background-color: ${({ danger, theme }) =>
      danger && theme.newColors.errorBg};
  }
`;

interface IProps {
  orderId: OrderIdType;
  edit: () => void;
  preview: () => void;
  remove: () => void;
}

const ActionButtons: React.FC<IProps> = (props) => {
  const intl = useIntl();

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    props.edit();
  };
  const handlePreview = (e: MouseEvent) => {
    e.stopPropagation();
    props.preview();
  };
  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    props.remove();
  };

  return (
    <GridWrapper>
      <ActionHeading>
        {intl.formatMessage({ id: "illustrations.actions.heading" })}
      </ActionHeading>
      <ActionList>
        <ActionItem onClick={handlePreview}>
          <ActionIcon
            type="eye"
            alt={intl.formatMessage({
              id: "illustrations.alt.previewIllustration",
            })}
          />
          <FormattedMessage id="illustrations.actions.preview" />
        </ActionItem>
        <ActionItem onClick={handleEdit}>
          <ActionIcon
            type="edit"
            alt={intl.formatMessage({
              id: "illustrations.alt.editIllustration",
            })}
          />
          <FormattedMessage id="illustrations.actions.edit" />
        </ActionItem>
        <ActionItem onClick={handleRemove}>
          <ActionIcon
            type="trash-red"
            danger
            alt={intl.formatMessage(
              { id: "illustrations.alt.removeIllustration" },
              { orderId: props.orderId }
            )}
          />
          <FormattedMessage id="illustrations.actions.remove" />
        </ActionItem>
      </ActionList>
    </GridWrapper>
  );
};

export default ActionButtons;
