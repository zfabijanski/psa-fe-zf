import chunk from "lodash/chunk";
import React, { MouseEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Variant } from "slices/confirmModal";
import ConfirmModal from "components/UI/ConfirmModal/ConfirmModal";
import ScrollableContainer from "components/UI/ScrollableContainer/ScrollableContainer";
import CloseIcon from "../CloseIcon";
import { Details } from "./Details";
import { HealthProblemTile as Tile } from "./HealthProblemsTile";
import { IHealthProblem } from "./types";

const HealthProblemsCalculator: React.FC<IHealthProblem> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const handleClick = (amount: number) => () => {
    props.onSave(amount);
  };
  const handleCancel = () => {
    setShowModal(false);
    props.onCancel();
  };

  const handleCloseInfo = () => {
    setShowModal(false);
    setDetails([]);
    setImage("");
  };
  const handleOpenInfo =
    (newDetails: string[], newImage: string) =>
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setDetails(newDetails);
      setImage(newImage);
      setShowModal(true);
    };

  const groupedData = chunk(props.data, 3);
  return (
    <Calculator>
      <CloseIcon handleCancel={handleCancel} />
      <CenteredScrollableContainer overflowX="auto">
        <Container>
          {showModal ? (
            <InfoModal
              onConfirm={handleCloseInfo}
              showBackdrop={false}
              variant={Variant.Confirm}
              confirmText={{ id: "confirmWindow.ok" }}
            >
              <Details details={details} image={image} />
            </InfoModal>
          ) : (
            groupedData.map((row, index) => (
              <div key={`row${index}`}>
                {row.map((elt) => (
                  <Tile
                    key={elt.title}
                    {...elt}
                    onClick={handleClick(elt.amount)}
                    onInfoClick={handleOpenInfo(elt.details, elt.image)}
                  />
                ))}
              </div>
            ))
          )}
        </Container>
      </CenteredScrollableContainer>
      <Footer>
        <FormattedMessage id={"apk.healthProblems.calculator.disclaimer"} />
      </Footer>
    </Calculator>
  );
};

export default HealthProblemsCalculator;

const InfoModal = styled(ConfirmModal)`
  && {
    .modal {
      top: 20%;
    }
    @media only screen and (max-width: 1280px) {
      .message {
        max-height: 270px;
      }
      .modal {
        top: 15%;
      }
    }
    @media only screen and (max-width: 1024px) {
      .message {
        max-height: 350px;
      }
      .modal {
        top: 20%;
      }
    }
  }
`;

const CenteredScrollableContainer = styled(ScrollableContainer)`
  text-align: center;
`;

const Container = styled.div`
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Calculator = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  min-height: 80px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 15px 25px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
