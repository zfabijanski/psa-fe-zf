import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fullscreenDisableIcon from "../../../assets/icons/fullscreen-disable.svg";
import fullscreenEnableIcon from "../../../assets/icons/fullscreen-enable.svg";
import PdfViewer from "../../../components/PdfViewer/PdfViewer";

interface IContainerProps {
  isFullscreenEnabled: boolean;
}

const Container = styled.div<IContainerProps>`
  flex: 1;
  position: relative;
  margin: 24px 24px 0;

  @media (min-width: 1440px) {
    margin: 48px 48px 0;
  }
`;

const BackgroundContainer = styled.div`
  width: 70%;
  height: 70%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const Background = styled.div`
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const FullscreenButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  outline: 0;
  border: 0;
  padding: 0;
  background: transparent;
  z-index: 10;
`;

const FullscreenButtonImage = styled.img`
  height: 45px;
  width: 45px;
`;

const ScrollablePdfViewerContainer = styled.div`
  position: relative;
  overflow-y: auto;
  max-height: 100%;
  height: 100%;
  width: 100%;
  z-index: 0;
`;

interface IViewerProps {
  url?: string;
  isFullscreenEnabled: boolean;
  onToggleFullscreen: () => void;
}

const Viewer = ({
  url,
  isFullscreenEnabled,
  onToggleFullscreen,
}: IViewerProps) => {
  const [isDocumentRendered, setIsDocumentRendered] = useState(false);

  const handleDocumentRender = () => {
    setIsDocumentRendered(true);
  };

  useEffect(() => {
    setIsDocumentRendered(false);
  }, [url]);

  return (
    <Container isFullscreenEnabled={isFullscreenEnabled}>
      <BackgroundContainer>
        <Background />
      </BackgroundContainer>
      {isDocumentRendered && (
        <FullscreenButton onClick={onToggleFullscreen}>
          <FullscreenButtonImage
            src={
              isFullscreenEnabled ? fullscreenDisableIcon : fullscreenEnableIcon
            }
          />
        </FullscreenButton>
      )}
      {url && (
        <ScrollablePdfViewerContainer>
          <PdfViewer url={url} onDocumentRender={handleDocumentRender} />
        </ScrollablePdfViewerContainer>
      )}
    </Container>
  );
};

export default Viewer;
