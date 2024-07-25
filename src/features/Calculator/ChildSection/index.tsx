import { connect } from "react-redux";
import { RootState } from "../../../AppStore";
import { ChildSection, IChildSectionProps } from "./ChildSection";

const mapStateToProps = (
  state: RootState,
  { mainCoverCode }: IChildSectionProps
) => {
  const productCoversLimits =
    state.productCoversLimits.items[state.calculator.current.productGuid];
  return {
    deathBenefitMinMax:
      mainCoverCode !== undefined
        ? productCoversLimits[mainCoverCode] &&
          productCoversLimits[mainCoverCode].addSumAssured
        : undefined,
  };
};

export default connect(mapStateToProps)(ChildSection);
