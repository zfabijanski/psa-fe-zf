import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { formatCurrency } from "utils/transformers";
import PruButton from "components/UI/PruButton/PruButton";
interface IProps {
  sum: number;
  onSave: () => void;
}

const Footer = styled.div`
  min-height: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: ". Sum Button";
  background-color: ${({ theme }) => theme.newColors.gray10};
`;

const ButtonContainer = styled.div`
  grid-area: Button;
  display: grid;
  justify-content: end;
  align-self: center;
  padding-right: 48px;
`;

const SumIndicator = styled.div`
  grid-area: Sum;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  color: ${({ theme }) => theme.newColors.primary100};
`;

const SumText = styled.span`
  color: ${({ theme }) => theme.newColors.gray100};
  margin-right: 10px;
`;

const ModalFooter: React.FC<IProps> = (props) => {
  const intl = useIntl();

  return (
    <Footer>
      <SumIndicator>
        <SumText>{intl.formatMessage({ id: "apk.modal.sum" })}</SumText>
        {formatCurrency(props.sum)}
      </SumIndicator>
      <ButtonContainer>
        <PruButton onClick={props.onSave}>
          {intl.formatMessage({ id: "apk.modal.save" })}
        </PruButton>
      </ButtonContainer>
    </Footer>
  );
};

export default ModalFooter;
