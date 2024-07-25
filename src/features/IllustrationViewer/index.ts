import { connect } from "react-redux";
import { closeIllustrationPreview } from "slices/illustrations";
import { RootState } from "../../AppStore";
import IllustrationViewer from "./IllustrationViewer";

const mapStateToProps = ({ illustrations }: RootState) => ({
  calculationId: illustrations.previewedCalculationId,
});

const mapDispatchToProps = {
  closeIllustrationPreview,
};

export default connect(mapStateToProps, mapDispatchToProps)(IllustrationViewer);
