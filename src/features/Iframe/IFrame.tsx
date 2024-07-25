import React from "react";
import styled from "styled-components";

const IFrame = styled.iframe`
  height: 100%;
  width: 100%;
  display: flex;
  border: none;
`;

interface IProps {
  src?: string;
  onLoad?: () => void;
}

const PruIFrame: React.FunctionComponent<IProps> = ({ onLoad, src }) => (
  <IFrame onLoad={onLoad} src={src} />
);

export default PruIFrame;
