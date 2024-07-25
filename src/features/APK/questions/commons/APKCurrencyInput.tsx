import { FC, useState } from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import styled, { CSSProp } from "styled-components/macro";
import Modal from "../../../../common/features/Survey/components/AuxiliaryCalculator/Modal";
import { ICalculatorData } from "../../../../common/features/Survey/components/AuxiliaryCalculator/types";
import { Flex } from "../../../../components/UI/Box";
import {
  CurrencyInput,
  ICurrencyInputProps,
} from "../../../../components/UI/CurrencyInput";
import { ETextAlign } from "../../../../components/UI/Input";
import PruButton from "../../../../components/UI/PruButton/PruButton";
import { formatNumber } from "../../../../utils/transformers";

const APKCurrencyInput: FC<
  Omit<ICurrencyInputProps, "value" | "onChange"> & {
    onChange: (value?: number, isFromCalculator?: boolean) => void;
    value?: number;
    calculatorData?: ICalculatorData;
    topLabel?: string;
    bottomLabel?: string;
    minValueError?: { value: number; message: MessageDescriptor };
    maxValueError?: { value: number; message: MessageDescriptor };
    labelsCss?: CSSProp;
    maxValue?: number;
    textAlign?: string;
  }
> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const handleChange = (value?: string) => {
    const newValue =
      value !== undefined && value !== "" ? parseInt(value, 10) : undefined;

    if (newValue && props.maxValue && newValue > props.maxValue) {
      return;
    }

    props.onChange(newValue, false);
  };

  const handleCalculatorClick = () => setShowModal(true);

  const handleSaveCalculator = (amount: number) => {
    props.onChange(amount, true);
    setShowModal(false);
  };

  const getError = ():
    | Array<{ trKey: string; values?: Record<string, string> }>
    | undefined => {
    if (props.value !== undefined) {
      if (
        props.minValueError !== undefined &&
        props.value < props.minValueError.value
      ) {
        return [
          {
            trKey: props.minValueError.message.id!,
            values: {
              min: formatNumber(props.minValueError.value),
            },
          },
        ];
      } else if (
        props.maxValueError !== undefined &&
        props.value > props.maxValueError.value
      ) {
        return [
          {
            trKey: props.maxValueError.message.id!,
            values: {
              max: formatNumber(props.maxValueError.value),
            },
          },
        ];
      }

      return undefined;
    }
  };

  const handleCloseCalculator = () => setShowModal(false);

  return (
    <Container>
      <Labels css={props.labelsCss}>
        {props.topLabel && <Label>{props.topLabel}</Label>}
        <Flex css={{ alignItems: "center", fontSize: "16px" }}>
          <CurrencyInput
            {...props}
            labelProps={{
              validationInfoTrKeys: getError(),
            }}
            onChange={handleChange}
            value={props.value !== undefined ? props.value.toString() : ""}
            isApproved={props.isApproved}
            isInvalid={!!getError()}
            hideEmptyValidations
            textAlign={props.textAlign || ETextAlign.center}
          />
          {props.calculatorData && (
            <StyledPruButton
              buttonType="secondary"
              icon="calculator"
              iconPosition="right"
              children={<FormattedMessage id="apk.label.examples" />}
              onClick={handleCalculatorClick}
            />
          )}
        </Flex>
        {props.bottomLabel && <Label>{props.bottomLabel}</Label>}
      </Labels>
      {props.calculatorData && (
        <Modal
          isEnabled={showModal}
          type={props.calculatorData.type}
          data={props.calculatorData.data}
          onSave={handleSaveCalculator}
          onCancel={handleCloseCalculator}
        />
      )}
    </Container>
  );
};

export default APKCurrencyInput;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Labels = styled.div<{ css?: CSSProp }>`
  display: flex;
  flex-direction: column;
  text-align: center;
  ${(props) => props.css};
`;

const Label = styled.span`
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 0 2px;
`;

const StyledPruButton = styled(PruButton)`
  margin-left: 12px;

  &,
  &:hover,
  &:active {
    border-width: 1px;
  }

  &:hover svg {
    & > * {
      stroke: ${({ theme }) => theme.newColors.primary100};
    }

    & > rect {
      fill: ${({ theme }) => theme.newColors.primary100};
    }
  }
`;
