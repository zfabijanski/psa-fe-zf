import { connect } from "react-redux";
import {
  getNextQuestion,
  startQuestionnaire,
  stopQuestionnaire,
} from "slices/bop";
import { isConfirmModalOpen } from "slices/confirmModal";
import { RootState } from "../../AppStore";
import BOP from "./BOP";

const mapStateToProps = ({
  auxiliaryCalculator,
  bop,
  confirmModal,
}: RootState) => {
  return {
    questionsLength: bop.questions.length,
    currentStep: bop.currentStep,
    allSteps: bop.allSteps,
    isConfirmModalVisible: isConfirmModalOpen({ confirmModal }),
    isAuxiliaryCalculatorVisible: auxiliaryCalculator.isOpen,
  };
};

const mapDispatchToProps = {
  getNextQuestion,
  startQuestionnaire,
  stopQuestionnaire,
};

export default connect(mapStateToProps, mapDispatchToProps)(BOP);
