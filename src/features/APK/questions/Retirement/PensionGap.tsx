import { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled, { css } from "styled-components/macro";
import { Icon } from "../../../../components/UI/Icon";
import PruIcon from "../../../../components/UI/PruIcon/PruIcon";
import { textEllipsis } from "../../../../theme/textEllipsis";
import { formatCurrency } from "../../../../utils/transformers";
import IncomeTitle from "../commons/IncomeTitle";

interface IProps {
  incomeValue?: number;
  pension?: number;
  gap?: number;
}

const PensionGap: FC<IProps> = (props) => {
  const [isConstantTextExpanded, setIsConstantTextExpanded] = useState(false);

  const handleExpandHideClick = () => {
    setIsConstantTextExpanded((wasExpanded) => !wasExpanded);
  };

  return (
    <div>
      <IncomeTitle income={props.incomeValue} />
      <StyledDivider type="arrow-divider-horizontal" />

      <Chart>
        <ChartPension>
          <FormattedMessage id="apk.retirement" />
          <ChartBold>{formatCurrency(props.pension)}</ChartBold>
        </ChartPension>
        <ChartGap>
          <FormattedMessage id="apk.retirement.pensionGap" />
          <ChartBold>{formatCurrency(props.gap)}</ChartBold>
        </ChartGap>
      </Chart>
      <Flex>
        <ConstantText isExpanded={isConstantTextExpanded}>
          <FormattedMessage id="apk.retirement.nettoIncome.constantText" />
        </ConstantText>
        <ExpandButton onClick={handleExpandHideClick}>
          <FormattedMessage
            id={
              isConstantTextExpanded
                ? "apk.retirement.nettoIncome.hide"
                : "apk.retirement.nettoIncome.expand"
            }
          />
          <IconWrapper>
            <Icon
              name={isConstantTextExpanded ? "chevron-up" : "chevron-down"}
              width={20}
            />
          </IconWrapper>
        </ExpandButton>
      </Flex>

      <hr />
    </div>
  );
};

export default PensionGap;

const Chart = styled.div`
  display: flex;
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.newColors.white100};
`;

const chartPart = css`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0 24px;
`;

const ChartPension = styled.div`
  ${chartPart}
  background-color: ${({ theme }) => theme.newColors.primary80};
  border-right: 4px solid ${({ theme }) => theme.newColors.white100};
  width: 40%;
  @media (min-width: 992px) {
    width: 25%;
  }
`;

const ChartGap = styled.div`
  ${chartPart}
  background-color: ${({ theme }) => theme.newColors.primary100};
  width: 60%;
  @media (min-width: 992px) {
    width: 75%;
  }
`;

const ConstantText = styled.span<{ isExpanded: boolean }>`
  margin-bottom: 5px;
  display: block;
  ${textEllipsis};
  white-space: ${({ isExpanded }) => (isExpanded ? "pre-wrap" : "nowrap")};
  max-width: ${({ isExpanded }) => !isExpanded && "880px"};
  margin-right: 48px;
`;

const ChartBold = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

const ExpandButton = styled.span`
  color: ${({ theme }) => theme.newColors.primary100};
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
  user-select: none;
  margin-left: auto;

  > span {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.newColors.gray100};

      svg path {
        stroke: ${({ theme }) => theme.newColors.gray100};
      }
    }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 10px;

  svg path {
    stroke: ${({ theme }) => theme.newColors.primary100};
  }
`;

const StyledDivider = styled(PruIcon)`
  margin: 16px auto;

  &,
  & img {
    width: 100%;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 24px;
`;
