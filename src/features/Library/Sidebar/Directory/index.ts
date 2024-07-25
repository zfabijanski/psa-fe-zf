import { connect } from "react-redux";
import { toggleDirectory } from "slices/library";
import { RootState } from "../../../../AppStore";
import { IDirectory } from "../../types";
import DirectoryContainer from "./DirectoryContainer";

interface IOwnProps {
  directory: IDirectory;
}

const mapStateToProps = ({ library }: RootState, ownProps: IOwnProps) => {
  const { directory } = ownProps;
  return {
    directory: {
      ...library.directoriesMetadata[directory.directoryId],
      ...directory,
    },
  };
};

const mapDispatchToProps = {
  toggleDirectory,
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryContainer);
