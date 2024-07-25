import React, { FC, useState } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import ScrollableContainer from "../../../../../components/UI/ScrollableContainer/ScrollableContainer";
import TabComponent from "../../../commons/Tab";
import ViewContainer from "../../../commons/ViewContainer";
import Consultant from "./Consultant";
import Director from "./Director";
import Manager from "./Manager";
import SeniorDirector from "./SeniorDirector";
import ComponentContainer from "./TabElements/ComponentContainer";
import Header from "./TabElements/Header";
import TabsContainer from "./TabElements/TabsContainer";

const CustomTab = styled(TabComponent)`
  &:nth-child(1) {
    margin: 30px 40px 0 0;
  }
  margin: 30px 40px 0 0;
`;

const Content = styled.div`
  padding-top: 10px;
  margin: 20px;

  @media only screen and (max-width: 1280px) {
    margin: 10px 20px 20px;
  }
`;

interface IProps {
  title: string;
}

type Tab = "tab1" | "tab2" | "tab3" | "tab4";

interface ITabStatus {
  id: Tab;
  text: string;
  active: boolean;
}

const MultiTab: FC<IProps> = ({ title }) => {
  const [tabStatus, setTabStatus] = useState<ITabStatus[]>([
    {
      id: "tab1",
      text: "commissionSystem.multitab.consultant.header",
      active: true,
    },
    {
      id: "tab2",
      text: "commissionSystem.multitab.manager.header",
      active: false,
    },
    {
      id: "tab3",
      text: "commissionSystem.multitab.director.header",
      active: false,
    },
    {
      id: "tab4",
      text: "commissionSystem.multitab.seniorDirector.header",
      active: false,
    },
  ]);
  const activeTab = tabStatus.find((elt) => elt.active) || tabStatus[0];

  const getTabComponent = () => {
    switch (activeTab.id) {
      case "tab2":
        return (
          <ScrollableContainer>
            <Manager />
          </ScrollableContainer>
        );
      case "tab3":
        return (
          <ScrollableContainer>
            <Director />
          </ScrollableContainer>
        );
      case "tab4":
        return (
          <ScrollableContainer>
            <SeniorDirector />
          </ScrollableContainer>
        );
      case "tab1":
      default:
        return <Consultant />;
    }
  };
  const handleTabClick = (tab: Tab) => () =>
    setTabStatus(
      tabStatus.map((elt) => {
        return {
          ...elt,
          active: elt.id === tab,
        };
      })
    );
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <ComponentContainer>
          <Header>
            <TabsContainer>
              {tabStatus.map((tab) => (
                <CustomTab
                  key={tab.id}
                  active={tab.active}
                  text={tab.text}
                  onClick={handleTabClick(tab.id)}
                />
              ))}
            </TabsContainer>
          </Header>
          <Content>{getTabComponent()}</Content>
        </ComponentContainer>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default MultiTab;
