import React from "react";
import styled from "styled-components";
import {
  CodeTypes,
  IAllAnswers,
  QuestionDataTypeCode,
  IAnswerFull,
  IAnswerMultiGroup,
  IAnswerTree,
} from "../../Survey.types";
import { IDropdownLists } from "slices/bopDropdownLists";
import SurveySelect from "../SurveySelect";
import { IconType } from "components/UI/PruIcon/PruIcon";
import SelectButton from "components/UI/SelectButton";

import SurveyDatePicker from "../SurveyDatePicker";
import SurveyMultiGroup from "../SurveyMultiGroup";
import SurveyInput from "../SurveyInput";
import SurveyTree from "../SurveyTree";
import SurveyTextArea from "../SurveyTextArea";

const checkMultiHasBooleans = (answers: IAnswerFull[]) => {
  const hasBoolean = answers.some(({ type }) => type === CodeTypes.Boolean);
  const isMulti = !answers.every(({ type }) => type === CodeTypes.Boolean);

  return isMulti && hasBoolean;
};

const AnswerWrapper = styled.div<{ answers: IAnswerFull[] }>`
  display: flex;
  justify-content: ${(props) =>
    props.answers?.length > 3 ? "center" : "flex-start"};
  position: relative;
  flex-wrap: wrap;
  margin: 0 -12px;
`;

interface IProps extends IAllAnswers {
  type: QuestionDataTypeCode;
  questionCode: string;
  disabled: boolean;
  dateFormat: string;
  dropdownLists: IDropdownLists;
}

interface IMultiGroupRecord {
  id: string;
  input: IAnswerMultiGroup;
  dropdown: IAnswerMultiGroup;
  disabled: boolean;
}

type TypeAnswers = IAnswerMultiGroup[] | IAnswerFull[];

const Answers = ({
  statuses,
  onChange,
  type,
  disabled,
  dateFormat,
  dropdownLists,
  questionCode,
}: IProps) => {
  const renderAnswers = () => {
    const multiHasBooleans = checkMultiHasBooleans(statuses);

    return statuses
      .filter((answer: IAnswerFull) => answer.isVisible)
      .map((answer: IAnswerFull, _, array) => {
        switch (answer.type) {
          case CodeTypes.Boolean:
            return (
              <SelectButton
                key={answer.code}
                onClick={onChange(answer.code, answer.isMain)}
                isApproved={answer.isApproved}
                isActive={answer.isActive}
                text={answer.label}
                icons={answer.icons as IconType[]}
                disabled={disabled}
                count={array.length}
                questionCode={questionCode}
                css={{
                  /** Style parity with PruInput */
                  ...(multiHasBooleans && {
                    minHeight: 52,
                    width: "calc(33% - 24px)",
                  }),
                }}
              />
            );
          case CodeTypes.Date:
            return (
              <SurveyDatePicker
                key={answer.code}
                isApproved={answer.isApproved}
                isActive={answer.isActive}
                value={answer.value}
                onChange={onChange(answer.code, answer.isMain)}
                disabled={disabled}
                css={{
                  margin: "0 12px",
                }}
              />
            );
          case CodeTypes.Textarea:
            const isInvalid = Boolean(
              answer.error ||
                !answer.value?.match(answer.validationPattern ?? "")
            );

            return (
              <SurveyTextArea
                key={answer.code}
                isApproved={answer.isApproved}
                value={answer.value}
                isInvalid={isInvalid}
                onChange={onChange(answer.code, answer.isMain)}
                readOnly={type === CodeTypes.Info || !answer.isEditable}
                disabled={disabled}
                transformationCode={answer.text_transform_code}
                labelProps={{
                  labelText: answer.label,
                  validationInfoTrKeys:
                    !!isInvalid && !!answer.validationPatternError
                      ? [{ trKey: answer.validationPatternError }]
                      : [],
                }}
                css={{
                  width: "calc(100% - 24px)",
                  margin: "12px",
                  "& label": { width: "100%" },
                }}
              />
            );
          default:
            if (answer.dictionary) {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const memoizedOptions = React.useMemo(
                () =>
                  answer.dictionary ? dropdownLists[answer.dictionary] : [],
                [answer.dictionary]
              );
              return (
                <SurveySelect
                  key={answer.code}
                  isApproved={answer.isApproved}
                  onChange={onChange(answer.code, answer.isMain)}
                  value={answer.value}
                  options={memoizedOptions}
                  disabled={disabled}
                  placeholder={answer.placeHolder}
                  labelProps={{
                    labelText: answer.label,
                  }}
                  hideValidationInfo
                  css={{
                    width: "calc(33% - 24px)",
                    margin: "12px",
                  }}
                />
              );
            } else {
              return (
                <SurveyInput
                  key={answer.code}
                  type={answer.type}
                  isApproved={answer.isApproved}
                  value={answer.value}
                  onChange={onChange(answer.code, answer.isMain)}
                  textSuffix={answer.answer_sufix}
                  allowedSignsRegex={answer.validationPattern}
                  readOnly={type === CodeTypes.Info || !answer.isEditable}
                  disabled={disabled}
                  transformationCode={answer.text_transform_code}
                  labelProps={{
                    labelText: answer.label,
                  }}
                  css={{
                    width: "calc(33% - 24px)",
                    margin: "12px",
                  }}
                />
              );
            }
        }
      });
  };

  const renderMultiGroup = (
    multigroupAnswers: IAnswerMultiGroup[],
    isDisabled: boolean
  ) => {
    const normalizedData = multigroupAnswers.reduce<{
      [key: string]: IAnswerMultiGroup;
    }>((result, elt) => {
      result[elt.code] = elt;
      return result;
    }, {});

    const multiGroups = multigroupAnswers.reduce<IMultiGroupRecord[]>(
      (result, elt) => {
        if (elt.type === CodeTypes.Boolean) {
          const inputCode = elt.subanswersCodes[0];
          const datePickerCode = elt.subanswersCodes[1];
          result.push({
            id: elt.code,
            input: normalizedData[inputCode],
            dropdown: normalizedData[datePickerCode],
            disabled: false,
          });
        }
        return result;
      },
      []
    );

    return multiGroups.map((elt) => {
      const inputStatus = statuses.find(
        (status) => status.code === elt.input.code
      );
      const dropdownStatus = statuses.find(
        (status) => status.code === elt.dropdown.code
      );

      return (
        <React.Fragment key={elt.id}>
          {inputStatus && dropdownStatus && (
            <SurveyMultiGroup
              inputIsActive={inputStatus.isActive}
              inputValue={inputStatus.value}
              inputType={inputStatus.type}
              inputLabel={elt.input.label}
              inputIsApproved={elt.input.isApproved}
              inputOnChange={onChange(elt.input.code, elt.input.isMain)}
              dropdownIsActive={dropdownStatus.isActive}
              dropdownValue={dropdownStatus.value}
              dropdownLabel={elt.dropdown.label}
              dropdownIsApproved={elt.dropdown.isApproved}
              dropdownOnChange={onChange(
                elt.dropdown.code,
                elt.dropdown.isMain
              )}
              dropdownImplicitValue={dropdownStatus.implicitValue}
              dropdownPlaceHolder={dropdownStatus.placeHolder}
              disabled={isDisabled}
              validationPattern={elt.input.validationPattern}
              transformationCode={elt.input.text_transform_code}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              dropdownList={React.useMemo(
                () => dropdownLists.ANSWER_OLD_LV,
                []
              )}
            />
          )}
        </React.Fragment>
      );
    });
  };

  const renderAnswersByQuestionType = (
    parsedAnswers: TypeAnswers,
    isDisabled: boolean
  ) => {
    switch (type) {
      case CodeTypes.MultiGroup:
        return renderMultiGroup(
          parsedAnswers as IAnswerMultiGroup[],
          isDisabled
        );
      case CodeTypes.Tree:
        return (
          <SurveyTree
            onChange={onChange}
            level={0}
            parentPath={[]}
            children={statuses as IAnswerTree[]}
            disabled={disabled}
            questionCode={questionCode}
          />
        );
      default:
        return renderAnswers();
    }
  };

  return (
    <AnswerWrapper answers={statuses}>
      {renderAnswersByQuestionType(statuses, disabled)}
    </AnswerWrapper>
  );
};

export default Answers;
