import { connect } from "react-redux";
import {
  resetAnswers,
  updateMultiSelectAnswer,
  updateNestedMultiSelectAnswer,
  updateNestedSingleSelectAnswer,
  updateStringAnswer,
  getNextQuestion,
  refuseAnswer,
  singleSelectClickHandler,
  undoLastQuestion,
} from "slices/bop";
import { RootState } from "../../AppStore";
import { Survey } from "../../common/features/Survey";

const mapStateToProps = ({ bop, bopDropdownLists }: RootState) => {
  return {
    questions: bop.questions,
    dropdownLists: bopDropdownLists.items,
    isQuestionLoading: bop.isQuestionLoading,
    isQuestionDeleting: bop.isQuestionDeleting,
  };
};

const mapDispatchToProps = {
  handleAnswerRefusal: refuseAnswer,
  resetState: resetAnswers,
  updateSingleSelectAnswer: singleSelectClickHandler,
  updateMultiSelectAnswer,
  updateStringAnswer,
  onNextQuestionClick: getNextQuestion,
  onPreviousQuestionClick: undoLastQuestion,
  updateNestedSingleSelectAnswer,
  updateNestedMultiSelectAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
