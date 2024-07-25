import styled from "styled-components";

export const Backdrop = styled.div.attrs({
  "aria-label": "backdrop",
})`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 300;
  left: 0;
  top: 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.7);
`;
