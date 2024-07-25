import throttle from "lodash/throttle";
import { FC, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import PageLayout from "../../../../layouts/PageLayout";
import { StartSlide } from "slices/businessWithPrudential";
import { memoryHistory } from "../../../../utils/router";
import useWindowSize from "../../../../utils/useWindowSize";
import { ISlideData } from "../types";

interface IPosition {
  top: number;
  bottom: number;
  center: number;
  id: string;
  slideNumber: number;
}

const Container = styled.div`
  position: relative;
  height: 100%;
  display: block;
`;

const Slide = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media only screen and (max-width: 1280px) {
    max-width: 100%;
    height: 100%;
    margin-bottom: 70px;

    &:last-child {
      margin-bottom: 0px;
    }

    & > div {
      height: 100%;
      width: 100%;
    }
  }
`;

interface IProps {
  slides: ISlideData[];
  startSlide?: StartSlide;
  prolongUserSession: () => void;
  pageNamePrefix?: string;
}

const Slider: FC<IProps> = ({
  prolongUserSession,
  slides,
  startSlide,
  pageNamePrefix,
}) => {
  const [currentSlide, setCurrentSlide] = useState(startSlide || 0);
  const handlePrevButtonClick = () => memoryHistory.goBack();
  const intl = useIntl();
  const [windowHeight, windowWidth] = useWindowSize();
  const pageName = `${
    pageNamePrefix
      ? `${intl.formatMessage({
          id: "businessWithPrudential.title",
        })} / `
      : ""
  }${intl.formatMessage({ id: slides[currentSlide].pageLabel })}`;
  const scrollIntoSlide = (slide: number, auto?: boolean) => {
    const nextSlide = document.getElementById(slides[slide].id);
    if (nextSlide) {
      nextSlide.scrollIntoView({ behavior: auto ? "auto" : "smooth" });
    }
  };
  const handleNextSlideButtonClick = () => {
    if (currentSlide < slides.length - 1) {
      scrollIntoSlide(currentSlide + 1);
    }
  };
  const throttledProlong = throttle(prolongUserSession, 120000);

  const scrollHandler = (slidesPosition: IPosition[]) => (event: Event) => {
    const { scrollTop } = event.target as HTMLElement;
    slidesPosition.forEach((slide) => {
      const offset = scrollTop + slide.center;
      if (offset < slide.bottom && offset > slide.top) {
        setCurrentSlide(slide.slideNumber);
        throttledProlong();
      }
    });
  };

  const getSlidesPosition = (slideContainer: HTMLElement) => {
    if (slideContainer) {
      return Array.from(slideContainer.children).map((slide, index) => {
        return {
          slideNumber: index,
          top: (slide as HTMLElement).offsetTop,
          bottom:
            (slide as HTMLElement).offsetTop +
            (slide as HTMLElement).offsetHeight,
          center: (slide as HTMLElement).offsetHeight / 2,
          id: slide.id,
        };
      });
    }
    return [];
  };

  useLayoutEffect(() => {
    const slideContainer = document.getElementById("page-container");
    if (slideContainer) {
      const newPositions = getSlidesPosition(
        slideContainer.children[
          slideContainer.childElementCount - 1
        ] as HTMLElement
      );
      const scrollHandlerWithPositions = scrollHandler(newPositions);
      slideContainer.addEventListener("scroll", scrollHandlerWithPositions);
      scrollIntoSlide(currentSlide, true);
      return () => {
        if (slideContainer) {
          slideContainer.removeEventListener(
            "scroll",
            scrollHandlerWithPositions
          );
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowHeight, windowWidth]);

  return (
    <PageLayout
      pageName={pageName}
      footer={{
        leftSection: [
          { config: "prevButtonConfig", onClick: handlePrevButtonClick },
        ],
      }}
    >
      <Container>
        {slides.map((elt) => {
          return (
            <Slide id={elt.id} key={elt.id}>
              {elt.component({ handleNextSlideButtonClick })}
            </Slide>
          );
        })}
      </Container>
    </PageLayout>
  );
};

export default Slider;
