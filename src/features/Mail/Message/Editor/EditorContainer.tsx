/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import { ProductGuidType } from "../../../Products/types";
import { AdditionalField, IFields, ISignature } from "../../types";
import Editor from "./Editor";
import { errorMandatoryFieldMessage, errorMessages } from "./errorMessages";

interface IProps {
  getSignatureIfNeeded: () => void;
  additionalFields: AdditionalField[];
  changeEditorField: (field: keyof IFields, value: string) => void;
  changeEditorFieldValidationError: (
    field: keyof IFields,
    error: string
  ) => void;
  onShouldSendDocsByMailChange: () => void;
  shouldSendDocsByMail: boolean;
  fields: IFields;
  fieldValidations: IFields;
  signature?: ISignature;
  updateFirstNameInDb: () => void;
  refetchCurrentMeetingIfNeeded: () => void;
  clientName: string;
  hasPesel: boolean;
  setHasPesel(value: boolean): void;
  dateOfBirth: string;
  productGuid: ProductGuidType | null;
  getCalculationValues(productGuid: number, index: number): void;
}

const EditorContainer = (props: IProps) => {
  useLayoutEffect(() => {
    props.getSignatureIfNeeded();
    props.refetchCurrentMeetingIfNeeded();
    if (!props.fields.firstName) {
      handleEditorFieldChange("firstName", props.clientName, true);
    }
  }, []);

  useEffect(() => {
    if (props.productGuid) {
      props.getCalculationValues(props.productGuid, 0);
    }
  }, [props.productGuid]);

  useEffect(() => {
    if (props.dateOfBirth) {
      props.changeEditorField("birthdate", props.dateOfBirth);
    }
  }, [props.dateOfBirth]);

  const [isEditingAllowed, setIsEditingAllowed] = useState(true);

  const handleEditorFieldChange = (
    field: keyof IFields,
    value: string,
    isValid: boolean
  ) => {
    if (isValid) {
      props.changeEditorField(field, value);

      if (props.fieldValidations[field]) {
        props.changeEditorFieldValidationError(field, "");
      }

      if (field === "firstName") {
        const previousFirstNameValue = props.fields.firstName;
        if (previousFirstNameValue !== value) {
          props.updateFirstNameInDb();
        }
      }
    } else {
      setIsEditingAllowed(false);

      if (!props.fieldValidations[field]) {
        props.changeEditorFieldValidationError(
          field,
          value?.trim() ? errorMessages[field].id! : errorMandatoryFieldMessage
        );
      }
    }
  };

  return (
    <Editor
      {...props}
      onFieldChange={handleEditorFieldChange}
      isFocusable={isEditingAllowed}
    />
  );
};

export default EditorContainer;
