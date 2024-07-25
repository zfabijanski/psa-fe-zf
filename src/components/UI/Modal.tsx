import { FC } from "react";
import styled, { createGlobalStyle, css } from "styled-components/macro";
import { FocusOn } from "react-focus-on";
import { useAppDispatch, useAppSelector } from "AppStore";
import { Icon } from "./Icon";
import { TypoH2, TypoBodyRegular } from "./typography";
import PruButton from "./PruButton/PruButton";
import { FormattedMessage, useIntl } from "react-intl";
import { closeModal } from "slices/modal";
import { ModalTypes } from "../../models/Modal";

const HideBodyOverflow = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export const Modal: FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.modal);
  const {
    modalIllustration,
    modalTitleTrKey,
    modalContentTrKey,
    modalContent,
    modalButtons,
    ModalComponent,
    modalHtml,
    modalHtmlTrValues,
    modalType,
    maskClosable = true,
  } = data;
  const { cancel, confirm } = modalButtons || {
    confirm: {
      textTrKey: "modal.ok",
    },
  };

  const showModal = !!Object.keys(data).length;

  if (!showModal) return <div />;

  return (
    <FocusOn>
      <Mask onClick={maskClosable ? () => dispatch(closeModal()) : undefined}>
        <HideBodyOverflow />
        <Wrapper onClick={(e) => e.stopPropagation()} role="dialog">
          <ModalContent>
            {modalIllustration && (
              <StyledIcon name={modalIllustration} width={120} />
            )}
            {modalTitleTrKey && (
              <StyledTypoH2 modalType={modalType}>
                <FormattedMessage id={modalTitleTrKey} />
              </StyledTypoH2>
            )}
            {modalContentTrKey &&
              (Array.isArray(modalContentTrKey) ? (
                modalContentTrKey.map((tr, index) => (
                  <SingleMessage
                    key={index}
                    notLast={
                      !!(
                        modalContentTrKey &&
                        index < modalContentTrKey.length - 1
                      )
                    }
                  >
                    {Array.isArray(tr) ? (
                      tr.map((singleTr, index) => (
                        <FormattedMessage key={index} id={singleTr} />
                      ))
                    ) : typeof tr === "string" ? (
                      <FormattedMessage id={tr} />
                    ) : (
                      <FormattedMessage id={tr.trKey} values={tr.values} />
                    )}
                  </SingleMessage>
                ))
              ) : (
                <FormattedMessage id={modalContentTrKey} />
              ))}
            {modalContent && modalContent}
            {ModalComponent && <ModalComponent />}
            {modalHtml && (
              <ModalHtml
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(
                    { id: modalHtml },
                    modalHtmlTrValues
                  ) as string,
                }}
              />
            )}
          </ModalContent>

          <Separator />

          <ButtonsContainer>
            {cancel && (
              <StyledButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(closeModal());
                  cancel.onClick && cancel.onClick();
                }}
                buttonType="secondary"
                size="large"
              >
                <FormattedMessage id={cancel.textTrKey} />
              </StyledButton>
            )}

            {confirm && (
              <PruButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(closeModal());
                  confirm.onClick && confirm.onClick();
                }}
                size="large"
                buttonType={
                  modalType === ModalTypes.danger ? "error" : "primary"
                }
              >
                <FormattedMessage
                  defaultMessage={"OK"}
                  id={confirm.textTrKey}
                />
              </PruButton>
            )}
          </ButtonsContainer>
        </Wrapper>
      </Mask>
    </FocusOn>
  );
};

const SingleMessage = styled.div<{
  notLast?: boolean;
}>`
  ${({ notLast }) =>
    notLast &&
    css`
      margin-bottom: 10px;
    `}
`;

const Mask = styled.div.attrs({
  "data-testid": "modal-mask",
})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.6;
    background-color: ${({ theme }) => theme.newColors.gray100};
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.newColors.gray10};
  max-width: 640px;
  margin-top: -100px;
  width: 100%;
  display: block;
  box-shadow: ${({ theme }) => theme.shadows.elevation2};
`;

const ModalContent = styled(TypoBodyRegular)`
  padding: 32px 24px;
  max-height: calc(100vh - 250px);
  white-space: break-spaces;
  text-align: center;
  flex-direction: column;
  word-wrap: break-word;
  overflow: auto;

  ${({ theme }) =>
    css`
      @media (max-width: ${theme.breakpoints.lg}px) {
        max-height: calc(100vh - 250px - 50px);
      }
    `}
`;

const ModalHtml = styled.div`
  white-space: pre-wrap;
`;

const StyledIcon = styled(Icon)`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`;

const StyledTypoH2 = styled(TypoH2)<{ modalType?: ModalTypes }>`
  color: ${({ theme, modalType }) =>
    modalType === ModalTypes.danger
      ? theme.newColors.error
      : theme.newColors.primary100};
  margin-bottom: 24px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.newColors.gray30};
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px 0;
`;

const StyledButton = styled(PruButton)`
  margin-right: 16px;
`;
