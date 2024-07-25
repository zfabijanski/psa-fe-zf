import { ArrayHelpers, FieldArray, FormikActions, FormikState } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { AddSectionButton } from "../../../components/UI/AddSectionButton";
import { Frequency } from "../../../models/common";
import { CalculationStatus, YesNo } from "models/calculator";
import { ChildSection } from "../ChildSection/ChildSection";
import { Separator } from "../ChildSection/componets/Separator";
import { IErrorMessageResolver } from "../errorMessageResolver";
import { ICalculationVM, IInsured } from "../types";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<IInsured[]>, "errors" | "values"> {
  childrenLimit?: number;
  name: string;
  childCovers: string[];
  mainCoverDuration?: number;
  frequencyCode?: Frequency;
  resolveErrorMessage: IErrorMessageResolver;
  currentCalculationId?: number;
  setCalculationStatus: (
    calculationId: number,
    status: CalculationStatus
  ) => void;
}

export const ChildrenSection: React.FC<IProps> = ({
  values,
  errors,
  resolveErrorMessage,
  childrenLimit,
  name,
  setFieldValue,
  mainCoverDuration,
  childCovers,
  frequencyCode,
  currentCalculationId,
  setCalculationStatus,
}) => {
  const createEmptyChild = (): IInsured => ({
    insuredUuid: "",
    dateOfBirth: "",
    covers: childCovers.map((coverCode) => ({
      code: coverCode,
      checked: YesNo.No,
    })),
  });

  const renderChildren = ({ push, remove }: ArrayHelpers) => {
    const addChild = () => push(createEmptyChild());
    const removeChild = (index: number) => () => {
      remove(index);
      if (currentCalculationId) {
        setCalculationStatus(currentCalculationId, CalculationStatus.Invalid);
      }
    };

    return (
      <>
        <Separator />
        {values.map((insured, index) => (
          <div key={index}>
            {!!index && <Separator />}
            <ChildSection
              values={insured}
              errors={errors[index] || {}}
              resolveErrorMessage={resolveErrorMessage}
              name={`${name}[${index}]`}
              title={
                <FormattedMessage
                  id="calculator.childSectionTitleNumbered"
                  values={{ index: index + 1 }}
                />
              }
              removeChild={removeChild(index)}
              setFieldValue={setFieldValue}
              monthsEnabled={true}
              mainCoverDuration={mainCoverDuration}
              frequencyCode={frequencyCode}
            />
          </div>
        ))}
        {(!childrenLimit || values.length < childrenLimit) && (
          <AddSectionButton
            textTrKey={
              values.length === 0
                ? "calculator.insureChild"
                : "calculator.insureAdditionalChild"
            }
            buttonIconName="user-plus"
            onClick={addChild}
          />
        )}
      </>
    );
  };

  return <FieldArray name={name} render={renderChildren} />;
};
