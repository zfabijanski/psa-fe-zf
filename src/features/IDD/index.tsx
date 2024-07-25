import { connect } from "react-redux";
import {
  getNextQuestion,
  startQuestionnaire,
  stopQuestionnaire,
} from "slices/idd";
import { isConfirmModalOpen } from "slices/confirmModal";
import { RootState } from "../../AppStore";
import IDD from "./IDD";

const mapStateToProps = ({ idd, confirmModal }: RootState) => {
  return {
    questionsLength: idd.questions.length,
    currentStep: idd.currentStep,
    allSteps: idd.allSteps,
    isConfirmModalVisible: !!isConfirmModalOpen({ confirmModal }),
  };
};

const mapDispatchToProps = {
  getNextQuestion,
  startQuestionnaire,
  stopQuestionnaire,
};

export default connect(mapStateToProps, mapDispatchToProps)(IDD);
