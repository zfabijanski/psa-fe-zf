import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import PageLayout from "../../../layouts/PageLayout";
import { redirect } from "../../../utils/router";
import PruIFrame from "../../Iframe/IFrame";

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const LoadingContainer = styled.div`
  position: relative;
  height: 100%;
`;

const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

interface IProps {
  repeatQuestionnaire(): void;
  goToProducts: () => void;
  iddId: number;
}

const Report: React.FC<IProps> = ({ iddId, ...props }) => {
  const [iFrameLoaded, setIFrameLoaded] = useState(false);

  const handleEmailButtonClick = () => redirect("/mail");
  const handleRepeatButtonClick = () => props.repeatQuestionnaire();
  const handleIFrameLoaded = () => setIFrameLoaded(true);

  const iframeUrl = "/psao/api/documents/preview/html/idd?iddId=" + iddId;

  return (
    <PageLayout
      pageName="reportIdd.title"
      footer={{
        leftSection: [
          { config: "prevButtonConfig", onClick: props.goToProducts },
        ],
        rightSection: [
          {
            buttonType: "secondary",
            onClick: handleRepeatButtonClick,
            children: <FormattedMessage id={"bottomButtonBar.retry"} />,
          },
          {
            config: "getArrowNextConfig",
            message: "bottomButtonBar.products",
            onClick: props.goToProducts,
          },
          {
            config: "getArrowNextConfig",
            message: "bottomButtonBar.email",
            onClick: handleEmailButtonClick,
          },
        ],
      }}
    >
      <Container>
        {!iFrameLoaded && (
          <LoadingContainer>
            <Spinner>
              <LoadingSpinner />
            </Spinner>
          </LoadingContainer>
        )}
        <PruIFrame src={iframeUrl} onLoad={handleIFrameLoaded} />
      </Container>
    </PageLayout>
  );
};

export default Report;
