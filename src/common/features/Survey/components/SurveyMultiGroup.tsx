import styled from "styled-components";
import { CodeTypes, TextTransformationCode } from "../Survey.types";
import { SelectOption } from "components/UI/Select";
import BOPInput from "./SurveyInput";
import BOPSelect from "./SurveySelect";

interface IProps {
  dropdownList: SelectOption[];
  validationPattern?: string | RegExp;
  transformationCode: TextTransformationCode;
  inputLabel?: string;
  dropdownLabel?: string;
  inputIsActive: boolean;
  inputIsApproved: boolean;
  dropdownIsActive: boolean;
  dropdownIsApproved: boolean;
  inputValue: string;
  inputType: CodeTypes;
  dropdownValue: string;
  disabled: boolean;
  dropdownImplicitValue?: string;
  dropdownPlaceHolder?: string;
  inputOnChange: (newValue: string) => void;
  dropdownOnChange: (newValue: string) => void;
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const InputWrapper = styled.div({
  width: "calc(33% - 24px)",
  margin: "12px",
});
const StyledSelect = styled(BOPSelect)({
  width: "calc(33% - 24px)",
  margin: "12px",
});

export const SurveyMultiGroup = (props: IProps) => {
  return (
    <Container>
      <InputWrapper>
        <BOPInput
          isApproved={props.inputIsApproved}
          value={props.inputValue}
          onChange={props.inputOnChange}
          disabled={props.disabled}
          type={props.inputType}
          transformationCode={props.transformationCode}
          allowedSignsRegex={props.validationPattern}
          labelProps={{
            labelText: props.inputLabel,
          }}
        />
      </InputWrapper>
      <StyledSelect
        isApproved={props.dropdownIsApproved}
        value={props.dropdownValue}
        onChange={props.dropdownOnChange}
        options={props.dropdownList}
        disabled={props.disabled}
        placeholder={props.dropdownPlaceHolder}
        hideValidationInfo
        labelProps={{
          labelText: props.dropdownLabel,
        }}
      />
    </Container>
  );
};

export default SurveyMultiGroup;
