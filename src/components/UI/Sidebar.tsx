import { ReactNode } from "react";
import styled from "styled-components";

const SidebarElement = styled.div`
  background-color: #ffffff;
  padding: 16px 0 0 16px;
  width: 265px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 1px 0 rgb(10 27 56 / 32%),
    0px 18px 28px 0 rgb(10 27 56 / 16%);

  & > *:last-child {
    padding-bottom: 16px;
  }

  @media only screen and (min-width: 1366px) {
    padding: 16px 0 0 16px;
    width: 350px;
  }

  @media only screen and (min-width: 1440px) {
    width: 372px;
  }

  @media only screen and (min-width: 1920px) {
    width: 484px;
  }
`;

const FixedSection = styled.div`
  padding-right: 16px;
`;

const ScrollableSection = styled.div`
  padding-right: 16px;
  overflow-y: auto;
  height: 100%;
`;

interface IProps {
  fixedSection?: ReactNode;
  scrollableSection?: ReactNode;
}

const Sidebar = (props: IProps) => (
  <SidebarElement>
    <FixedSection>{props.fixedSection}</FixedSection>
    <ScrollableSection>{props.scrollableSection}</ScrollableSection>
  </SidebarElement>
);

export default Sidebar;
