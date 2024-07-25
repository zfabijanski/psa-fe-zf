import React from "react";
import { MessageDescriptor } from "react-intl";
import styled from "styled-components";
import { options } from "../Section/dictionary";
import ConfirmModal from "components/UI/ConfirmModal/ConfirmModal";
import PruButton from "components/UI/PruButton/PruButton";
import { Variant } from "slices/confirmModal";
import { IReport } from "common/services/types";
import {
  dateFormat,
  parseAnswerBooleanToString,
} from "../QuestionTypes/parsers";
import {
  CancelStatus,
  CodeTypes,
  IAnswerTree,
  IQuestion,
  isAnswerMultiGroup,
  isAnswerTree,
  ParsedAnswers,
} from "../../Survey.types";
import PruQuestion from "./Question";

const msgConfirmRefuse: MessageDescriptor = {
  id: "bopAndPiw.confirm.denyQuestion",
};

const labelStopAdq: MessageDescriptor = {
  id: "confirmWindow.stopAdequacy",
};

interface IQuestionWrapperProps {
  question: IQuestion;
}

interface IQuestionWrapperState {
  answerStatus: ParsedAnswers[];
  cancellationStatus: CancelStatus;
  modalOpen: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled(PruButton)`
  width: 200px;
`;

export default class QuestionWrapper extends React.Component<
  IQuestionWrapperProps,
  IQuestionWrapperState
> {
  public state: IQuestionWrapperState = {
    modalOpen: false,
    cancellationStatus: this.props.question.answer_cancel
      ? {
          id: this.props.question.answer_cancel.quse_anse_map_code,
          label: this.props.question.answer_cancel.answer_value,
          checked: this.props.question.answer_cancel.default_value,
          showModal: this.props.question.answer_cancel.questionnaire_cancel,
        }
      : null,
    answerStatus: this.props.question.answers,
  };

  private resetState = () => {
    this.setState((prevState) => ({
      ...prevState,
      answerStatus: prevState.answerStatus.map((elt) => {
        if (isAnswerTree(elt)) {
          return this.resetSubtree(elt);
        } else {
          return { ...elt, isActive: false };
        }
      }),
    }));
  };

  private updateStringAnswer = (answerCode: string, newValue: string) => {
    this.setState((prevState) => ({
      ...prevState,
      answerStatus: [
        ...prevState.answerStatus.map((elt) => {
          if (elt.code === answerCode) {
            return {
              ...elt,
              isActive: true,
              value: newValue,
            };
          } else {
            return elt;
          }
        }),
      ],
    }));
  };

  private updateMultiSelect = (answerCode: string) => {
    this.setState((prevState) => ({
      ...prevState,
      answerStatus: [
        ...prevState.answerStatus.map((elt) => {
          if (elt.code === answerCode) {
            if (isAnswerTree(elt)) {
              return elt.isActive
                ? this.resetSubtree(elt)
                : { ...elt, isActive: true };
            } else {
              return {
                ...elt,
                isActive: !elt.isActive,
              };
            }
          }
          return elt;
        }),
      ],
    }));
  };

  private updateSingleSelect = (answerCode: string) => {
    this.setState((prevState) => ({
      ...prevState,
      answerStatus: [
        ...prevState.answerStatus.map((elt) => ({
          ...elt,
          isActive: elt.code === answerCode ? !elt.isActive : false,
        })),
      ],
    }));
  };

  private resetSubtree = (subtree: IAnswerTree): IAnswerTree => ({
    ...subtree,
    isActive: false,
    subanswers: subtree.subanswers.map(this.resetSubtree),
  });

  private getUpdatedTree = (
    branch: IAnswerTree[],
    path: string[],
    answerCode: string,
    toggle?: boolean
  ): IAnswerTree[] => {
    type TreeUpdater = (
      parent: IAnswerTree[],
      currentDepth: number
    ) => IAnswerTree[];
    const updateTree: TreeUpdater = (parent, currentDepth) =>
      parent.reduce((acc: IAnswerTree[], node: IAnswerTree) => {
        if (currentDepth < path.length) {
          if (node.code === path[currentDepth]) {
            return [
              ...acc,
              {
                ...node,
                subanswers: updateTree(node.subanswers, currentDepth + 1),
              },
            ];
          } else {
            return [...acc, node];
          }
        } else {
          if (node.code === answerCode) {
            const subtree = node.isActive
              ? this.resetSubtree(node)
              : { ...node, isActive: true };
            return [...acc, subtree];
          } else {
            return [...acc, toggle ? { ...this.resetSubtree(node) } : node];
          }
        }
      }, []);

    return updateTree(branch, 0);
  };

  private updateNestedSingleSelect = (
    answerCode: string,
    parentPath: string[]
  ) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        answerStatus: this.getUpdatedTree(
          prevState.answerStatus as IAnswerTree[],
          parentPath,
          answerCode,
          true
        ),
      };
    });
  };

  private updateNestedMultiSelect = (
    answerCode: string,
    parentPath: string[]
  ) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        answerStatus: this.getUpdatedTree(
          prevState.answerStatus as IAnswerTree[],
          parentPath,
          answerCode
        ),
      };
    });
  };

  private handleAnswerRefusal = () => {
    this.setState((prevState) => ({
      ...prevState,
      modalOpen:
        !!prevState.cancellationStatus && !prevState.cancellationStatus.checked,
      cancellationStatus: prevState.cancellationStatus && {
        ...prevState.cancellationStatus,
        checked: !prevState.cancellationStatus.checked,
      },
    }));
  };

  private generateReport = (): IReport[] => {
    const { answerStatus, cancellationStatus } = this.state;

    const parseValue = (elt: ParsedAnswers): string =>
      parseAnswerBooleanToString(isAnswerMultiGroup(elt) || elt.isActive);

    const getAnswers = (data: ParsedAnswers[]): IReport[] => {
      return data.reduce((acc: IReport[], elt) => {
        acc.push({
          quse_anse_map_code: elt.code,
          value: elt.type === CodeTypes.Boolean ? parseValue(elt) : elt.value,
        });
        if (isAnswerTree(elt)) {
          acc.push(...getAnswers(elt.subanswers));
        }
        return acc;
      }, []);
    };

    const report = [...getAnswers(answerStatus)];

    if (cancellationStatus) {
      report.push({
        quse_anse_map_code: cancellationStatus.id,
        value: parseAnswerBooleanToString(cancellationStatus.checked),
      });
    }

    return report;
  };

  private modalOnCancel = () =>
    this.setState((prevState) => ({
      modalOpen: false,
      cancellationStatus: prevState.cancellationStatus && {
        ...prevState.cancellationStatus,
        checked: false,
      },
    }));

  private modalOnConfirm = () =>
    this.setState((prevState) => ({
      answerStatus: this.props.question.answers,
      modalOpen: false,
      cancellationStatus: prevState.cancellationStatus && {
        ...prevState.cancellationStatus,
        checked: true,
      },
    }));

  public render() {
    const { question } = this.props;
    const { answerStatus, cancellationStatus, modalOpen } = this.state;
    return (
      <Container>
        <PruQuestion
          code={question.code}
          type={question.data_type as CodeTypes}
          question={question.question_value}
          prompt={question.prompt_value || ""}
          tooltip={question.tooltip || ""}
          statuses={answerStatus}
          cancel={cancellationStatus}
          handleAnswerRefusal={this.handleAnswerRefusal}
          resetAnswers={this.resetState}
          answer_type_code={question.answer_type_code}
          updateStringAnswer={this.updateStringAnswer}
          updateMultiSelectAnswer={this.updateMultiSelect}
          updateSingleSelectAnswer={this.updateSingleSelect}
          updateNestedSingleSelectAnswer={this.updateNestedSingleSelect}
          updateNestedMultiSelectAnswer={this.updateNestedMultiSelect}
          disabled={false}
          dateFormat={dateFormat}
          dropdownLists={options}
        />
        <Button onClick={this.generateReport}>Raport</Button>
        {modalOpen && (
          <ConfirmModal
            message={msgConfirmRefuse}
            confirmText={labelStopAdq}
            onCancel={this.modalOnCancel}
            onConfirm={this.modalOnConfirm}
            showBackdrop={true}
            showCancel={true}
            variant={Variant.Deny}
          />
        )}
      </Container>
    );
  }
}
