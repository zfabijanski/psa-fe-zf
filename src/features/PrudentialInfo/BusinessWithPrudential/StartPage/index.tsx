import { connect } from "react-redux";
import { setStartSlide } from "slices/businessWithPrudential";
import StartPage from "./StartPage";

const mapDispatchToProps = {
  setStartSlide,
};

export default connect(null, mapDispatchToProps)(StartPage);
