import React, { FC } from "react";
import styled from "styled-components/macro";
import TextContainer from "../../../../commons/TextContainer";
import { IAnnualCommission } from "../basicCommissionConfig";

const Container = styled.div<Pick<IProps, "hideBorder">>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: ${({ theme, hideBorder }) =>
    hideBorder ? "none" : `1px solid ${theme.newColors.white100}`};

  span {
    &:nth-child(1) {
      color: ${({ theme }) => theme.colors.darkGray};
    }
    &:nth-child(2) {
      color: ${({ theme }) => theme.newColors.white100};
    }
  }
`;

interface IProps extends IAnnualCommission {
  hideBorder?: boolean;
}

const AnnualCommissionColumn: FC<IProps> = ({ label, value, hideBorder }) => {
  return (
    <Container hideBorder={hideBorder}>
      <TextContainer fontSize={18} translationKey={label} />
      <TextContainer
        fontSize={26}
        translationKey={
          value !== ""
            ? "commissionSystem.basicCommission.percentage"
            : undefined
        }
        text={value !== "" ? undefined : ""}
        values={{ value }}
      />
    </Container>
  );
};

export default AnnualCommissionColumn;
