import { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import { formatCurrency } from "../../../../utils/transformers";

interface IProps {
  income?: number;
}

const IncomeTitle: FC<IProps> = (props) => {
  return (
    <IncomeValue>
      <FormattedMessage id="apk.income" />:
      <IncomevalueBold>{formatCurrency(props.income)}</IncomevalueBold>
    </IncomeValue>
  );
};

export default IncomeTitle;

const IncomeValue = styled.div`
  display: flex;
  font-size: 20px;
  line-height: 24px;
  justify-content: center;
  margin-bottom: 30px;
`;

const IncomevalueBold = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.newColors.primary100};
  margin-left: 4px;
`;
