import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { TypoH4 } from "../../../components/UI/typography";
import { Frequency } from "../../../models/common";
import {
  EValueToFormatType,
  formatValue,
} from "../../../utils/formatValueUtils";
import { WhiteSpace } from "../../../utils/types";

interface IProps {
  frequency: Frequency;
  premiumsTotal?: number;
  outOfDate?: boolean;
}

const SummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.newColors.primary100};
  color: ${({ theme }) => theme.newColors.white100};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
`;

const YearlyContribution = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Amount = styled.span`
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;
`;

const InsideWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.newColors.primary80};
  margin-left: 8px;
  text-align: center;
`;

const StyledTypoH4 = styled(TypoH4)`
  color: ${({ theme }) => theme.newColors.white100};
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const MainCellWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 52px;
  background-color: ${({ theme }) => theme.newColors.white100};
  line-height: 1.22;
  padding: 0 12px;
  flex-direction: column;
  white-space: pre-wrap;
  border: 1px solid ${({ theme }) => theme.newColors.gray30};
`;

const StyledCell = styled(MainCellWrapper)`
  border: 0;
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;
  padding: 8px 68px;
  min-width: 240px;
  color: ${({ theme }) => theme.newColors.primary100};
`;

export const PremiumSummary: React.FC<IProps> = ({
  premiumsTotal,
  frequency,
  outOfDate,
}) => (
  <SummaryContainer>
    <YearlyContribution>
      <TypoH4>
        <FormattedMessage
          id="calculator.yearlyContribution2"
          values={{ amount: "" }}
        />
      </TypoH4>
      <Amount>
        {premiumsTotal && frequency && !outOfDate
          ? formatValue(
              EValueToFormatType.currency,
              calculateAnnualPremium(Number(premiumsTotal), frequency)
            )
          : ""}
      </Amount>
    </YearlyContribution>
    <InsideWrapper>
      <StyledTypoH4>
        <FormattedMessage id={`calculator.premiumFreq.${frequency}`} />
      </StyledTypoH4>
      <StyledCell>
        {premiumsTotal && !outOfDate
          ? formatValue(EValueToFormatType.currency, premiumsTotal)
          : WhiteSpace.NonBreakingSpace}
      </StyledCell>
    </InsideWrapper>
  </SummaryContainer>
);

export const calculateAnnualPremium = (
  premiumPerFrequency: number,
  frequency: Frequency
): number => {
  switch (frequency) {
    case Frequency.Annually:
      return premiumPerFrequency;
    case Frequency.SemiAnnually:
      return premiumPerFrequency * 2;
    case Frequency.Quarterly:
      return premiumPerFrequency * 4;
    case Frequency.Monthly:
      return premiumPerFrequency * 12;
  }
};
