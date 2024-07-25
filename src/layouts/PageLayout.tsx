import React, { ReactNode, PropsWithChildren, ReactElement } from "react";
import { MessageDescriptor } from "react-intl";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/Header";
import { signOut } from "slices/auth";
import { RootState, useAppDispatch } from "../AppStore";
import { getCurrentMeetingClientName } from "slices/meetings";
import { useI18n } from "../utils/i18n";
import { redirect } from "../utils/router";
import Footer from "./components/Footer/Footer";
import { PageFooterConfig } from "./PageLayout.types";

const PageWrapper = styled.div`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: "touch";
`; // Property -webkit-overflow-scrolling has to be set to auto when error overlay is active. Otherwise, there is a problem with stacking context in Safari.

interface IProps {
  contentHeader?: ReactNode;
  footer?: PageFooterConfig | ReactElement;
  pageName?: MessageDescriptor["id"];
  clientName: string;
  agentName: string;
  navigationHidden?: boolean;
}

const PageLayout: React.FC<PropsWithChildren<IProps>> = (props) => {
  const i18n = useI18n();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleHomeClick = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      redirect("/");
    }
  };

  return (
    <PageWrapper>
      <Header
        clientName={props.clientName}
        agentName={props.agentName}
        pageName={props.pageName && i18n.formatMessage({ id: props.pageName })}
        onLogoutClick={() => dispatch(signOut())}
        onHomeClick={handleHomeClick}
        navigationHidden={props.navigationHidden}
      />
      {props.contentHeader}
      <Container id="page-container">{props.children}</Container>
      {React.isValidElement(props.footer) ? (
        props.footer
      ) : (
        <Footer {...props.footer} />
      )}
    </PageWrapper>
  );
};

const mapStateToProps = ({ meetings, auth }: RootState) => {
  const agentName = auth.info
    ? `${auth.info.givenName} ${auth.info.surname}`
    : "";
  return {
    agentName,
    clientName: getCurrentMeetingClientName(meetings),
  };
};

export default connect(mapStateToProps)(PageLayout);
