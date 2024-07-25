import React, { Component } from "react";
import styled from "styled-components";
import UserCard from "../../components/UserCard";
import PageLayout from "../../layouts/PageLayout";
import { IModalData } from "../../models/Modal";
import { Brand } from "slices/auth";
import { maxMeetingsCountExceededModal } from "../../utils/confirmModalFactory";
import { redirect, RoutePath } from "../../utils/router";
import TileContainer from "./TileContainer";

interface IProps {
  brand?: Brand;
  canAddMeeting: boolean;
  showModal: (data: IModalData) => void;
  getMeetingsCounts: () => void;
  clearCurrentMeeting: () => void;
  addMeeting: (clientName: string, redirectTo: RoutePath) => void;
  resetDocuments: () => void;
  resetMail: () => void;
  resetProducts: () => void;
  resetIllustrations: () => void;
  resetCalculatorState: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  min-height: 600px;

  @media only screen and (max-height: 768px) {
    min-height: 550px;
  }
`;

class Start extends Component<IProps> {
  public componentDidMount = () => {
    this.props.clearCurrentMeeting();
    this.props.getMeetingsCounts();
    this.props.resetDocuments();
    this.props.resetMail();
    this.props.resetProducts();
    this.props.resetIllustrations();
    this.props.resetCalculatorState();
  };

  public render = () => {
    const handleNewMeetingClick = () => {
      if (this.props.canAddMeeting) {
        redirect("/create");
      } else {
        this.props.showModal(maxMeetingsCountExceededModal);
      }
    };

    const handleLoadMeetingClick = () => redirect("/history");
    const handleLibraryClick = () => this.props.addMeeting("", "/library");
    const handleAboutClick = () => redirect("/about-prudential");
    const handleBusinessClick = () => redirect("/business-with-prudential");

    return (
      <PageLayout pageName="start.label.pageName">
        <Container>
          <UserCard />
          <TileContainer
            onNewMeetingClick={handleNewMeetingClick}
            onLoadMeetingClick={handleLoadMeetingClick}
            onLibraryClick={handleLibraryClick}
            onAboutClick={handleAboutClick}
            onBusinessClick={handleBusinessClick}
            brand={this.props.brand}
          />
        </Container>
      </PageLayout>
    );
  };
}

export default Start;
