import styled from "styled-components/macro";

const ComponentContainer = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 410px;

  @media only screen and (max-width: 1280px) {
    grid-template-rows: 80px 308px;
  }
  @media only screen and (max-width: 1024px) {
    grid-template-rows: 80px 410px;
  }
`;

export default ComponentContainer;
