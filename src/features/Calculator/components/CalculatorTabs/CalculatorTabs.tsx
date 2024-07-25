import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { Icon } from "../../../../components/UI/Icon";
import { TypoBodyBold } from "../../../../components/UI/typography";
import { CalculationStatus } from "models/calculator";
import { Tab } from "./Tab";

interface IProps {
  calculationsStatuses: CalculationStatus[];
  current?: number;
  onClick: (index: number) => void;
  onRemove: (index: number) => void;
  onNew: (index: number) => void;
}

const TabColorsMap = ["primary100", "violet", "secondary100"] as const;

const NewTab = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;

  &:hover {
    color: ${({ theme }) => theme.newColors.primary100};
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

export const CalculatorTabs: React.FC<IProps> = (props) => {
  const intl = useIntl();
  const count = props.calculationsStatuses.length;
  const handleClick = (value: number) => () => {
    props.onClick(value);
  };
  const handleNew = () => {
    props.onNew(count);
  };
  const handleRemove = (value: number) => (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onRemove(value);
  };

  return (
    <>
      {count > 0 ? (
        props.calculationsStatuses.map((calculationStatus, index: number) => (
          <Tab
            key={`tab-${index}`}
            index={index}
            active={props.current === index}
            color={TabColorsMap[index]}
            checked={calculationStatus === CalculationStatus.Illustrated}
            onClick={handleClick(index)}
            onRemove={handleRemove(index)}
          />
        ))
      ) : (
        <Tab index={0} active={true} color={TabColorsMap[0]} />
      )}
      {count < 3 && (
        <>
          <Spacer />
          <NewTab onClick={handleNew}>
            <TypoBodyBold>
              {intl.formatMessage({
                id: "calculator.tabs.addCalculation",
              })}
            </TypoBodyBold>
            <Icon name="calculator-plus" />
          </NewTab>
        </>
      )}
    </>
  );
};
