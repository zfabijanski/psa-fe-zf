import { Component } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { PhoneNumberInput } from "../../../../components/UI/PhoneNumberInput";
import { IInputProps, Input } from "../../../../components/UI/Input";
import PruCheckbox from "../../../../components/UI/PruCheckbox/PruCheckbox";
import {
  isBirthdateValid,
  isContentValid,
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isPassportValid,
  isPeselValid,
  isPhoneValid,
  isSubjectValid,
} from "../../../../utils/validationRules";
import { AdditionalField, IFields, ISignature } from "../../types";
import Content from "./Content/Content";
import { Datepicker } from "../../../../components/UI/Datepicker";

const GridContaier = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 12px;
  margin-bottom: 32px;
`;

const SendDocsByMailCheckbox = styled.div`
  grid-column: span 2;
  display: flex;
`;

const SubjectAndContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 24px;
  align-items: end;

  h3 {
    margin-bottom: 0;
  }
`;

const PruLabel = styled.h3`
  font-weight: 700;
  font-size: 24px;
  font-stretch: normal;
  line-height: 28px;
  color: ${({ theme }) => theme.newColors.neutral100Default};
  margin-bottom: 24px;
`;

interface IProps {
  additionalFields: AdditionalField[];
  onFieldChange: (
    field: keyof IFields,
    value: string,
    isValid: boolean
  ) => void;
  isFocusable: boolean;
  onShouldSendDocsByMailChange: () => void;
  shouldSendDocsByMail: boolean;
  fields: IFields;
  fieldValidations: IFields;
  signature?: ISignature;
  hasPesel: boolean;
  setHasPesel(value: boolean): void;
  dateOfBirth: string;
}

class Editor extends Component<IProps> {
  private shouldRenderOptionalField = (field: AdditionalField) => {
    return this.props.additionalFields.some((value) => value === field);
  };

  private createInputProps = (
    field: keyof IFields,
    validation: Function
  ): IInputProps => {
    const { onFieldChange, fieldValidations, fields } = this.props;

    return {
      labelProps: {
        labelTrKey: `mail.placeholder.${field}`,
        validationInfoTrKeys: fieldValidations[field]
          ? [{ trKey: fieldValidations[field] }]
          : undefined,
      },
      value: fields[field],
      onChange(value) {
        onFieldChange(field, value, true);
      },
      onBlur(value) {
        const trimmedValue = value?.trim();
        return onFieldChange(field, trimmedValue, validation(trimmedValue));
      },
      isInvalid: !!fieldValidations[field],
    };
  };

  private handleTogglePesel = () => {
    this.props.setHasPesel(!this.props.hasPesel);
    this.props.onFieldChange("pesel", "", true);
    this.props.onFieldChange("birthdate", this.props.dateOfBirth, true);
    this.props.onFieldChange("passport", "", true);
  };

  private handleMailRequestChange = () => {
    this.props.onShouldSendDocsByMailChange();
    this.props.onFieldChange("email", "", true);
    this.props.onFieldChange("phone", "", true);
  };

  public render() {
    const {
      onFieldChange,
      isFocusable,
      shouldSendDocsByMail,
      signature,
      hasPesel,
    } = this.props;
    const { content } = this.props.fields;

    const togglePeselFieldButton = (
      <PruCheckbox
        onChange={this.handleTogglePesel}
        checked={!hasPesel}
        hideValidationInfo
        labelProps={{
          labelTrKey: "mail.label.dontHavePesel",
        }}
      />
    );

    const dateField = hasPesel ? null : (
      <div>
        <Datepicker {...this.createInputProps("birthdate", isBirthdateValid)} />
      </div>
    );

    const peselField = (
      <Input
        {...this.createInputProps("pesel", isPeselValid)}
        allowedSignsRegex="^[0-9]*$"
      />
    );
    const firstNameField = (
      <Input {...this.createInputProps("firstName", isFirstNameValid)} />
    );
    const lastNameField = (
      <Input {...this.createInputProps("lastName", isLastNameValid)} />
    );
    const passportField = (
      <Input
        {...this.createInputProps("passport", isPassportValid)}
        onChange={(value) =>
          onFieldChange("passport", value?.toUpperCase(), true)
        }
      />
    );

    const emailField = (
      <Input {...this.createInputProps("email", isEmailValid)} />
    );

    const phoneField = (
      <PhoneNumberInput {...this.createInputProps("phone", isPhoneValid)} />
    );

    const subjectField = (
      <Input {...this.createInputProps("subject", isSubjectValid)} />
    );

    const peselOrPassportField = hasPesel ? peselField : passportField;

    return (
      <div>
        <PruLabel>
          <FormattedMessage id="mail.label.recipient" />
        </PruLabel>
        <GridContaier>
          {firstNameField}
          {this.shouldRenderOptionalField("lastName") && lastNameField}
          {this.shouldRenderOptionalField("pesel") && (
            <>
              {peselOrPassportField}
              {togglePeselFieldButton}
              {dateField}
            </>
          )}
          <SendDocsByMailCheckbox>
            <PruCheckbox
              onChange={this.handleMailRequestChange}
              checked={shouldSendDocsByMail}
              hideValidationInfo
              labelProps={{
                labelTrKey: "mail.label.mailRequest",
                modalContentTrKey: "mail.label.mailRequestTooltip",
              }}
            />
          </SendDocsByMailCheckbox>
        </GridContaier>
        {shouldSendDocsByMail && (
          <GridContaier>
            {emailField}
            {this.shouldRenderOptionalField("phone") && phoneField}
          </GridContaier>
        )}
        <SubjectAndContent>
          <div>{subjectField}</div>
          <Content
            value={content}
            isFocusable={isFocusable}
            validationFunction={isContentValid}
            signature={signature}
            onChange={onFieldChange.bind(this, "content")}
            validationTrKey={this.props.fieldValidations.content}
          />
        </SubjectAndContent>
      </div>
    );
  }
}

export default Editor;
