import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import PruIcon from "../../../../components/UI/PruIcon/PruIcon";

interface IProps {
  onClick: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 180px;
  background-color: ${({ theme }) => theme.newColors.white100};
  cursor: pointer;
  flex: 0 0 140px;

  &:hover {
    opacity: ${({ theme }) => theme.opacityHover};
  }
`;

const NewIllustration = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.newColors.gray100};
  font-weight: 700;
  max-width: 70px;
  text-align: center;
  margin-top: 18px;
`;

const AddIllustration: React.FC<IProps> = ({ onClick }) => {
  const intl = useIntl();

  return (
    <Container onClick={onClick} className="shadowable">
      <PruIcon
        type="calculation-black"
        alt={intl.formatMessage({
          id: "illustrations.alt.addCalculation",
        })}
      />

      <NewIllustration>
        {intl.formatMessage({ id: "productsPrudential.newIllustration" })}
      </NewIllustration>
    </Container>
  );
};

export default AddIllustration;
