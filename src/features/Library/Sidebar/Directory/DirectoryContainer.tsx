import { IDirectory, IDirectoryMetadata } from "../../types";
import Directory from "./Directory";

interface IProps {
  level: number;
  directory: IDirectory & IDirectoryMetadata;
  toggleDirectory: (directoryId: number) => void;
}

const DirectoryContainer = (props: IProps) => {
  return (
    <Directory
      directory={props.directory}
      onToggle={props.toggleDirectory}
      level={props.level}
    />
  );
};

export default DirectoryContainer;
