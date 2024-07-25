import { connect } from "react-redux";
import { InputId, setInputValue } from "slices/quarterlyIncomeCalculator";
import { RootState } from "../../../../../AppStore";
import SidePanel from "./SidePanel";

const mapStateToProps = ({
  quarterlyIncomeCalculator: { inputData },
}: RootState) => {
  return {
    inputData,
  };
};

const mapDispatchToProps = {
  setInputValue(id: InputId, value: string) {
    return setInputValue({ id, value });
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
