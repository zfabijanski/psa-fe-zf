import { connect } from "react-redux";
import { setOpen } from "slices/auxiliaryCalculator";
import { RootState } from "AppStore";
import AuxiliaryCalculator from "./AuxiliaryCalculator";

const mapDispatchToProps = {
  setOpen,
};

const mapStateToProps = ({ auxiliaryCalculator }: RootState) => ({
  isCalculatorVisible: auxiliaryCalculator.isOpen,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuxiliaryCalculator);
