import { connect } from "react-redux";
import { toggleFullscreen, getPreviewedDocumentUrl } from "slices/library";
import { RootState } from "../../../AppStore";
import ViewerContainer from "./ViewerContainer";

const mapStateToProps = ({ library }: RootState) => ({
  url: getPreviewedDocumentUrl(library),
  isFullscreenEnabled: library.isFullscreenEnabled,
});

const mapDispatchToProps = {
  onToggleFullscreen: toggleFullscreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewerContainer);
