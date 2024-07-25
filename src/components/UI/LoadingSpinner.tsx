import styled from "styled-components";
import LoaderSvg from "../../assets/loader.svg";
import { Flex } from "./Box";

const Spinner = styled.img`
  width: 40px;
  animation: rotate cubic-bezier(0.1, 0.3, 0.8, 0.1) 1s infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner = () => {
  return (
    <Flex css={{ alignItems: "center", justifyContent: "center" }}>
      <Spinner src={LoaderSvg} />
    </Flex>
  );
};

export default LoadingSpinner;
