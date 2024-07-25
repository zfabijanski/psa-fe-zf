/* eslint-disable react-hooks/exhaustive-deps */
import { FormikActions, FormikState } from "formik";
import React, { useEffect, useState } from "react";
import { Frequency } from "../../../models/common";
import { CalculationStatus, Direction, YesNo } from "models/calculator";
import { CoverCategory } from "slices/coversConfig";
import { getFieldName } from "../../../utils/formHelpers";
import { ICalculationVM, ICover, ValueType } from "../types";
import { CoverField } from "./types";

export interface ICoverProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICover>, "errors" | "values"> {
  name: string;
  frequencyCode?: Frequency;
}
export interface ICoverWrapperProps extends Omit<ICoverProps, "errors"> {
  calculationStatus?: CalculationStatus;
  calculationFeatureChanged: boolean;
  handleValueChange?: (key: string, value: ValueType) => void;
  renderComponent: (
    outdatedFields: string[],
    handleSetFieldValue: (key: string, value: ValueType) => void
  ) => React.ReactNode;
  isHospital?: boolean;
  coverMainCategory: CoverCategory;
}

export const CoverWrapper: React.FC<ICoverWrapperProps> = (props) => {
  const [outdatedFields, setOutdatedFields] = useState<string[]>([]);
  const [canBeOutdated, setCanByOutdated] = useState<boolean>(
    props.calculationStatus !== CalculationStatus.NotCalculated &&
      props.values.checked === YesNo.Yes
  );

  useEffect(() => {
    if (props.calculationStatus === CalculationStatus.Calculated) {
      setOutdatedFields([]);
      setCanByOutdated(props.values.checked === YesNo.Yes);
    } else if (
      props.calculationStatus === CalculationStatus.Invalid &&
      props.coverMainCategory === CoverCategory.WOP &&
      canBeOutdated
    ) {
      setOutdatedFields(
        getOutdatedFieldsForDirection(
          props.values.directionOfCalculation,
          props.isHospital
        )
      );
    }
  }, [props.calculationStatus]);

  useEffect(() => {
    if (
      props.calculationFeatureChanged &&
      canBeOutdated &&
      props.coverMainCategory !== CoverCategory.WOP
    ) {
      setOutdatedFields(
        getOutdatedFieldsForDirection(
          props.values.directionOfCalculation,
          props.isHospital
        )
      );
    }
  }, [props.calculationFeatureChanged]);

  const handleSetFieldValue = (key: string, value: ValueType) => {
    const { setFieldValue, values, name, handleValueChange } = props;
    setFieldValue(key, value);
    if (handleValueChange) {
      handleValueChange(key, value);
    }
    const fieldName = getFieldName(key);

    if (fieldName === "payments") {
      updatePremiumsSum(value as number, values.premiumPerFreq);
    } else if (fieldName === "premiumPerFreq") {
      updatePremiumsSum(values.payments, value as number);
    }

    const newDirectionOfCalculation =
      FieldToDirectionMap[fieldName] ||
      (values && values.directionOfCalculation);

    setFieldValue(`${name}.directionOfCalculation`, newDirectionOfCalculation);

    if (canBeOutdated) {
      setOutdatedFields(
        newDirectionOfCalculation
          ? getOutdatedFieldsForDirection(
              newDirectionOfCalculation,
              props.isHospital
            )
          : []
      );
    } else {
      setOutdatedFields([]);
      getOutdatedFieldsForField(fieldName, props.isHospital).forEach((it) =>
        setFieldValue(`${name}.${it}`, undefined)
      );
    }
  };

  const updatePremiumsSum = (payments?: number, premiumPerFreq?: number) =>
    props.setFieldValue(
      `${props.name}.sumOfPremiums`,
      payments && premiumPerFreq ? payments * premiumPerFreq : undefined
    );

  return <>{props.renderComponent(outdatedFields, handleSetFieldValue)}</>;
};

const getOutdatedFieldsForField = (fieldName: string, isHospital?: boolean) =>
  isHospital
    ? FieldToOutdatedFieldsMap[fieldName] || []
    : (FieldToOutdatedFieldsMap[fieldName] || []).filter(
        (outdatedField) => outdatedField !== CoverField.AddSumAssured
      );

const getOutdatedFieldsForDirection = (
  direction?: Direction,
  isHospital?: boolean
) =>
  direction
    ? isHospital
      ? DirectionToOutdatedFieldsMap[direction] || []
      : (DirectionToOutdatedFieldsMap[direction] || []).filter(
          (outdatedField) => outdatedField !== CoverField.AddSumAssured
        )
    : [];

const FieldToDirectionMap: { [key: string]: Direction } = {
  sumAssured: Direction.SumAssuredToPremium,
  addSumAssured: Direction.SumAssuredToPremium,
  premiumPerFreq: Direction.PremiumToSumAssured,
  expMatBen: Direction.MaturityBenefitToPremium,
};

const FieldToOutdatedFieldsMap: {
  [key: string]: CoverField[];
} = {
  sumAssured: [CoverField.PremiumPerFreq, CoverField.ExpMatBen],
  addSumAssured: [CoverField.PremiumPerFreq, CoverField.ExpMatBen],
  premiumPerFreq: [
    CoverField.SumAssured,
    CoverField.AddSumAssured,
    CoverField.ExpMatBen,
  ],
  expMatBen: [
    CoverField.SumAssured,
    CoverField.AddSumAssured,
    CoverField.PremiumPerFreq,
  ],
  idxOption: [CoverField.PremiumPerFreq],
};

const DirectionToOutdatedFieldsMap: {
  [key: string]: CoverField[];
} = {
  [Direction.MaturityBenefitToPremium]: [
    CoverField.SumAssured,
    CoverField.AddSumAssured,
    CoverField.PremiumPerFreq,
  ],
  [Direction.SumAssuredToPremium]: [
    CoverField.ExpMatBen,
    CoverField.PremiumPerFreq,
  ],
  [Direction.PremiumToSumAssured]: [
    CoverField.ExpMatBen,
    CoverField.SumAssured,
    CoverField.AddSumAssured,
  ],
};
