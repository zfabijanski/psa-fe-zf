import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import ProductsPageFooter from "../../components/ProductsPageFooter";
import PruButton from "../../components/UI/PruButton/PruButton";
import PageLayout from "../../layouts/PageLayout";
import PruIFrame from "../Iframe/IFrame";

const IFrameWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: ${({ theme }) => theme.newColors.white100};
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 12px solid ${({ theme }) => theme.newColors.gray10};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
`;

const StyledPruButton = styled(PruButton)`
  background-color: ${({ theme }) => theme.newColors.error};

  &,
  &:hover {
    border: 1px solid transparent;
  }
`;

interface IProps {
  calculationId?: number;
  closeIllustrationPreview: () => void;
  onOpenConfirmModal?: (onConfirm: () => void) => void;
}

const IllustrationViewer: React.FC<IProps> = (props) => {
  const intl = useIntl();
  useEffect(() => {
    return () => props.closeIllustrationPreview();
  });

  return (
    <PageLayout
      footer={
        <ProductsPageFooter
          prevButtonVisible={false}
          onOpenConfirmModal={props.onOpenConfirmModal}
        />
      }
      pageName="illustrations.illustration"
    >
      {props.calculationId !== undefined && (
        <IFrameWrapper>
          <ButtonWrapper>
            <StyledPruButton
              onClick={props.closeIllustrationPreview}
              icon="arrow-left"
            >
              {intl.formatMessage({ id: "calculator.goBack" })}
            </StyledPruButton>
          </ButtonWrapper>
          <PruIFrame
            src={`/psao/api/documents/preview/html/illustration?calculationId=${props.calculationId}`}
          />
        </IFrameWrapper>
      )}
    </PageLayout>
  );
};

export default IllustrationViewer;
