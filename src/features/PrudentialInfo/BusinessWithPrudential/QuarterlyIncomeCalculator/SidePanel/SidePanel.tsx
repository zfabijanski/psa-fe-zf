import styled, { useTheme } from "styled-components/macro";
import ScrollableContainer from "../../../../../components/UI/ScrollableContainer/ScrollableContainer";
import { IInputDataRecord, InputId } from "slices/quarterlyIncomeCalculator";
import {
  formatNumber,
  removeSeparator,
} from "../../../../../utils/transformers";
import { Input } from "../../../../../components/UI/Input";
import { SidePanelInputData } from "../types";
import { useIntl } from "react-intl";

export interface ISidePanelProps {
  inputData: SidePanelInputData;
  setInputValue: (id: InputId, value: string) => void;
}

const StyledInput = styled(Input)`
  background-color: ${(props) => props.theme.newColors.gray10};
  box-shadow: none;

  ${(props) =>
    props.isApproved &&
    `
        background-color: ${props.theme.newColors.primary100};
        box-shadow: none;
      &, & + * {
        color: ${props.theme.newColors.white100};
        -webkit-text-fill-color: ${props.theme.newColors.white100};
      }
  `};
`;

const SidePanel = ({ inputData, setInputValue }: ISidePanelProps) => {
  const intl = useIntl();
  const theme = useTheme();

  const handleChange =
    ({ id, maxValue }: IInputDataRecord) =>
    (value: string) => {
      if (
        id !== InputId.Bonus &&
        +removeSeparator(value) < (maxValue ?? +Infinity)
      ) {
        setInputValue(id, value);
      }
    };

  const filteredInputs = Object.values(inputData).filter(
    (elt) => elt.id !== InputId.Income
  );

  return (
    <ScrollableContainer>
      <Content>
        {filteredInputs.map((elt) => (
          <StyledInput
            key={elt.id}
            onChange={handleChange(elt)}
            filledDesc={elt.suffix}
            labelProps={{
              labelTrKey: elt.label,
              labelTextStyles: {
                fontWeight: "bold",
              },
            }}
            value={elt.value ? formatNumber(elt.value) : ""}
            readOnly={elt.id === InputId.Bonus}
          />
        ))}
        <StyledInput
          isApproved
          labelProps={{
            labelTrKey:
              "commissionSystem.quaterlyIncomeCalculator.inputs.income.label",
            labelTextStyles: {
              fontWeight: "bold",
              color: theme.newColors["primary100"],
            },
          }}
          filledDesc={intl.formatMessage({
            id: "commissionSystem.quaterlyIncomeCalculator.inputs.income.suffix",
          })}
          value={formatNumber(inputData[InputId.Income].value.toString())}
          onChange={() => {}}
          readOnly
        />
      </Content>
    </ScrollableContainer>
  );
};

export default SidePanel;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;

  @media only screen and (max-width: 1280px) {
    height: 360px;
  }

  @media only screen and (max-width: 1024px) {
    height: auto;
    padding: 0 15px;
  }
`;
