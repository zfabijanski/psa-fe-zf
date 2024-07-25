import { FC } from "react";
import styled from "styled-components/macro";
import { Icon } from "../../../components/UI/Icon";

const Container = styled.div<Pick<IProps, "invert">>`
  position: relative;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ invert }) => `rotate(${invert ? 180 : 0}deg)`};

  svg {
    width: 30px;
    position: relative;
    right: ${({ invert }) => (invert ? "-8px" : "8px")};
    animation: bounce 2s ease-in-out infinite;
    animation-play-state: running;

    & path {
      stroke: ${({ theme }) => theme.newColors.primary100};
    }
  }

  @keyframes bounce {
    from {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    to {
      transform: translateY(0px);
    }
  }

  &:hover {
    cursor: pointer;

    & svg > path {
      stroke: ${({ theme }) => theme.newColors.white100};
    }

    & > div > div {
      transform: translateY(-80px);
    }
  }

  @media only screen and (max-width: 1280px) {
    right: 20px;
    svg {
      right: 0px;
    }
  }

  @media only screen and (max-width: 1024px) {
    right: 0px;
  }
`;

const HoverIndicator = styled.div`
  height: 300px;
  width: 600px;
  background-color: ${({ theme }) => theme.newColors.primary100};
  border-radius: 400px 400px 0px 0px;
  position: absolute;
  transition: 0.3s;
  top: 80px;
`;

const HoverIndicatorContainer = styled.div<Pick<IProps, "invert">>`
  overflow: hidden;
  height: 80px;
  width: 600px;
  position: absolute;
  right: ${({ invert }) => (invert ? "-280px" : "-268px")};
  top: -14px;
`;

interface IProps {
  invert?: boolean;
  onClick: () => void;
}

const NextSlideButton: FC<IProps> = ({ invert, onClick }) => {
  return (
    <Container onClick={onClick} invert={invert}>
      <HoverIndicatorContainer invert={invert}>
        <HoverIndicator />
      </HoverIndicatorContainer>
      <Icon name="chevron-down-2" />
    </Container>
  );
};

export default NextSlideButton;
