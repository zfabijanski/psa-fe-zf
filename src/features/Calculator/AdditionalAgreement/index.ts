import { connect } from "react-redux";
import { ICoversLimits } from "../../../models/common";
import { RootState } from "../../../AppStore";
import { min } from "../../../utils/min";
import { getCoversConfigMap } from "../../../utils/selectors";
import { AdditionalAgreement, IProps } from "./AdditionalAgreement";

const mapStateToProps = (
  state: RootState,
  { mainCoverDuration }: Pick<IProps, "mainCoverDuration">
) => {
  const originalCoversLimits =
    state.productCoversLimits.items[state.calculator.current.productGuid];
  const calculatedCoversLimits = Object.keys(
    originalCoversLimits
  ).reduce<ICoversLimits>((acc, coverCode) => {
    acc[coverCode] = {
      ...originalCoversLimits[coverCode],
      duration: {
        ...originalCoversLimits[coverCode].duration,
        max: min(
          mainCoverDuration,
          originalCoversLimits[coverCode].duration.max
        ),
      },
    };
    return acc;
  }, {});

  return {
    coversConfigMap: getCoversConfigMap(state),
    coversLimits: calculatedCoversLimits,
  };
};

export default connect(mapStateToProps)(AdditionalAgreement);
