import { connect } from "react-redux";
import { onQuestionnaireStart } from "../../services/adequacyIdd";
import AdequacyIdd from "./AdequacyIdd";

const mapDispatchToProps = {
  onQuestionnaireStart,
};

export default connect(null, mapDispatchToProps)(AdequacyIdd);
