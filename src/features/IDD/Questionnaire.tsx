import { connect } from "react-redux";
import {
  resetAnswers,
  updateMultiSelectAnswer,
  updateStringAnswer,
  getNextQuestion,
  singleSelectClickHandler,
  undoLastQuestion,
} from "slices/idd";
import { RootState } from "../../AppStore";
import { Survey } from "../../common/features/Survey";

const mapStateToProps = ({ idd, bopDropdownLists }: RootState) => {
  return {
    questions: idd.questions,
    dropdownLists: bopDropdownLists.items,
    isQuestionLoading: idd.isQuestionLoading,
    isQuestionDeleting: idd.isQuestionDeleting,
  };
};

const mapDispatchToProps = {
  handleAnswerRefusal: () => {},
  resetState: resetAnswers,
  updateSingleSelectAnswer: singleSelectClickHandler,
  updateMultiSelectAnswer,
  updateStringAnswer,
  onNextQuestionClick: getNextQuestion,
  onPreviousQuestionClick: undoLastQuestion,
  updateNestedSingleSelectAnswer: () => {},
  updateNestedMultiSelectAnswer: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
