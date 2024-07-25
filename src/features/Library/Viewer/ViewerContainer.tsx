import React from "react";
import Viewer from "./Viewer";

interface IProps {
  url?: string;
  isFullscreenEnabled: boolean;
  onToggleFullscreen: () => void;
}

const ViewerContainer = ({
  url,
  isFullscreenEnabled,
  onToggleFullscreen,
}: IProps) => {
  return (
    <Viewer
      url={url}
      isFullscreenEnabled={isFullscreenEnabled}
      onToggleFullscreen={onToggleFullscreen}
    />
  );
};

export default ViewerContainer;
