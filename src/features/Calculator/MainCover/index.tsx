import { connect } from "react-redux";
import { emptyCoverLimits } from "mapper/productCoversLimits/productCoversLimits";
import { RootState } from "../../../AppStore";
import { ICoverProps } from "../CoverWrapper/CoverWrapper";
import MainCover from "./MainCover";

const mapStateToProps = (
  {
    productCoversLimits,
    calculator: {
      current: { productGuid },
    },
  }: RootState,
  { values: { code } }: ICoverProps
) => ({
  coverLimits:
    (productCoversLimits.items[productGuid] || {})[code] || emptyCoverLimits,
});

export default connect(mapStateToProps)(MainCover);
