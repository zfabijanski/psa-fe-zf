import styled from "styled-components/macro";

const CenterContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    padding-bottom: 50px;
  }
`;

export default CenterContent;
