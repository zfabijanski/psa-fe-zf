import { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import PageLayout from "../../../../layouts/PageLayout";
import { StartSlide } from "slices/businessWithPrudential";
import { redirect } from "../../../../utils/router";
import Tile from "../../../Start/Tile";
import { buttons } from "../buttons";

const Container = styled.div`
  position: relative;
  height: 100%;

  @media only screen and (max-width: 1280px) {
    height: auto;
  }
`;

const TilesContainer = styled.div`
  padding: 20px 12px;
  width: 100%;
  margin: auto;
  max-width: 496px;
`;

interface IProps {
  setStartSlide: (slideId: StartSlide) => void;
}

const StartPage: FC<IProps> = ({ setStartSlide }) => {
  const intl = useIntl();
  const handlePrevButtonClick = () => redirect("/");
  const onClickHandler = (slideId: StartSlide) => () => {
    setStartSlide(slideId);
    redirect("/business-with-prudential-slides");
  };
  return (
    <PageLayout
      pageName={intl.formatMessage({ id: "businessWithPrudential.title" })}
      footer={{
        leftSection: [
          { config: "prevButtonConfig", onClick: handlePrevButtonClick },
        ],
      }}
    >
      <Container>
        <TilesContainer>
          {buttons.map((button) => (
            <Tile
              key={button.label}
              icon={button.icon}
              label={button.label}
              onClick={onClickHandler(button.startSlidesFrom)}
              hoverPathKey={button.hoverPathKey}
            />
          ))}
        </TilesContainer>
      </Container>
    </PageLayout>
  );
};

export default StartPage;
