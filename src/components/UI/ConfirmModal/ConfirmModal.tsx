import React from "react";
import { FocusOn } from "react-focus-on";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import styled from "styled-components";
import { IConfirmModalOptions, Variant } from "slices/confirmModal";
import { ColorType } from "../../../theme/types";
import { useI18n } from "../../../utils/i18n";
import { Backdrop } from "../Backdrop";
import PruButton from "../PruButton/PruButton";
import PruIcon from "../PruIcon/PruIcon";
import ScrollableContainer from "../ScrollableContainer/ScrollableContainer";
import { Box, Flex } from "../Box";

const Modal = styled.div.attrs({
  role: "dialog",
})`
  width: 652px;
  position: fixed;
  z-index: 400;
  left: calc(50% - 326px);
  top: 30%;
  @media (max-height: 768px) {
    top: 20%;
  }
`;

const Content = styled.div`
  width: 100%;
  border-radius: 7px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 20px;

  h2 {
    height: 28px;
    font-size: 26px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.08;
    text-align: center;
  }

  p {
    font-size: 18px;
    font-stretch: normal;
    line-height: 1.33;
    text-align: center;
    color: ${({ theme }) => theme.newColors.gray100};
    margin: 0;
  }

  div {
    font-size: 18px;
    font-stretch: normal;
    line-height: 1.33;
    margin: 0;
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuccessButtonContainer = styled.div`
  text-align: center;
`;

const PrevButton = styled(PruButton)`
  text-align: right;
  padding: 0;
  min-width: 187px;
  outline: none;
  box-shadow: none;
`;

const PrevIcon = styled(PruIcon)`
  display: inline;
  margin-right: 6px;
  > img {
    margin-bottom: 4px;
  }
`;
const Column = styled(Box)({
  width: "33.33%",
});

const labelBack: MessageDescriptor = { id: "confirmWindow.back" };

export const ConfirmModal: React.FC<IConfirmModalOptions> = ({
  header,
  message,
  messageValues,
  confirmText,
  onCancel,
  onConfirm,
  showBackdrop = true,
  showCancel,
  showConfirm = true,
  variant,
  children,
  formattedText,
  className,
}) => {
  const i18n = useI18n();

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const getVariantStyling = () => {
    switch (variant) {
      case Variant.Deny:
        return {
          backgroundColor: "red" as ColorType,
          color: "white" as ColorType,
        };
      default:
        return {
          backgroundColor: "green" as ColorType,
          color: "white" as ColorType,
        };
    }
  };

  return (
    <div className={className}>
      <FocusOn enabled={showBackdrop}>
        {showBackdrop && <Backdrop />}
        <Modal className="modal">
          <Content>
            <Message className={"message"}>
              <ScrollableContainer overflowY={null}>
                {header && <h2>{i18n.messageToString(header)}</h2>}
                {message && (
                  <p>{i18n.messageToString(message, messageValues)}</p>
                )}
                {formattedText && (
                  <div dangerouslySetInnerHTML={{ __html: formattedText }} />
                )}
              </ScrollableContainer>
              {children}
            </Message>
          </Content>
          <Flex>
            <Column>
              {showCancel && (
                <PrevButton
                  buttonType="secondary"
                  children={
                    <div>
                      <PrevIcon
                        type={
                          showBackdrop ? "arrow-prev-white" : "arrow-prev-black"
                        }
                        alt={i18n.messageToString(labelBack) as string}
                      />
                      <FormattedMessage id={labelBack.id} />
                    </div>
                  }
                  onClick={onCancel}
                />
              )}
            </Column>
            <Column>
              {showConfirm && (
                <SuccessButtonContainer>
                  <PruButton
                    {...getVariantStyling()}
                    onClick={handleConfirmClick}
                  >
                    {i18n.messageToString(confirmText)}
                  </PruButton>
                </SuccessButtonContainer>
              )}
            </Column>
            <Column />
          </Flex>
        </Modal>
      </FocusOn>
    </div>
  );
};

export default ConfirmModal;
