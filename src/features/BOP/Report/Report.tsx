import React, { useState } from "react";
import { MessageDescriptor } from "react-intl";
import styled from "styled-components";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import PageLayout from "../../../layouts/PageLayout";
import { redirect } from "../../../utils/router";
import PruIFrame from "../../Iframe/IFrame";
import { useI18n } from "utils/i18n";

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
  adequacyId: number;
  hideFullscreenSpinner(): void;
}

const Report: React.FC<IProps> = ({
  adequacyId,
  hideFullscreenSpinner,
  ...props
}) => {
  const i18n = useI18n();
  const [iFrameLoaded, setIFrameLoaded] = useState(false);

  const handleEmailButtonClick = () => redirect("/mail");
  const handleRepeatButtonClick = () => props.repeatQuestionnaire();
  const handleIFrameLoaded = () => {
    setIFrameLoaded(true);
    hideFullscreenSpinner();
  };

  const iframeUrl =
    "/psao/api/documents/preview/html/adequacy?adequacyId=" + adequacyId;

  const labelProducts: MessageDescriptor = {
    id: "bottomButtonBar.products",
  };

  const labelEmail: MessageDescriptor = {
    id: "bottomButtonBar.email",
  };

  return (
    <PageLayout
      pageName="reportBop.title"
      footer={{
        leftSection: [
          { config: "prevButtonConfig", onClick: props.goToProducts },
        ],
        rightSection: [
          {
            buttonType: "secondary",
            onClick: handleRepeatButtonClick,
            children: i18n.formatMessage({ id: "bottomButtonBar.retry" }),
          },
          {
            config: "getArrowNextConfig",
            message: labelProducts.id,
            onClick: props.goToProducts,
          },
          {
            config: "getArrowNextConfig",
            message: labelEmail.id,
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
