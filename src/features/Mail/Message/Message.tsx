import React from "react";
import styled from "styled-components";
import Attachments from "./Attachments";
import Editor from "./Editor";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const MailEditor = styled.div`
  background: transparent;
  padding: 24px;
  flex: 1;
  overflow-y: auto;

  @media (min-width: 1366px) {
    padding: 48px;
  }
`;

const Message = () => (
  <Container>
    <Attachments />
    <MailEditor>
      <Editor />
    </MailEditor>
  </Container>
);

export default Message;
