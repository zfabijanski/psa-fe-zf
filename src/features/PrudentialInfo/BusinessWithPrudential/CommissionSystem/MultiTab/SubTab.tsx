import React, { FC, useState } from "react";
import styled from "styled-components/macro";
import Tab from "../../../commons/Tab";
import Table from "../../../commons/Table/Table";
import Header from "./TabElements/Header";
import TabsContainer from "./TabElements/TabsContainer";
import { ITableContent, ITabs, TabName } from "./types";

const Container = styled.div`
  display: grid;
  grid-template-rows: 25px 1fr;
`;

const Tabs = styled(TabsContainer)`
  border-bottom: none;
`;

const InnerTab = styled(Tab)<{ active: boolean }>`
  margin-right: 30px;
  border-bottom: ${({ active, theme }) =>
    active ? `3px solid ${theme.newColors.primary100}` : "none"};
  span {
    font-size: 18px;
    font-weight: 700;
  }
`;

const Content = styled.div`
  padding: 30px 20px;
  table {
    width: 100%;
    white-space: pre-wrap;
    tr {
      td:not(:first-child) {
        width: 400px;
        text-align: left;
        padding: 5px 20px;
      }
    }
  }
`;

interface IProps {
  tabs: ITabs[];
  tableContent: ITableContent;
}

interface ITabStatus extends ITabs {
  active: boolean;
}

const SubTab: FC<IProps> = (props) => {
  const [tabStatus, setTabStatus] = useState<ITabStatus[]>(
    props.tabs.map((tab, index) => ({
      ...tab,
      active: index === 0,
    }))
  );
  const activeTab = tabStatus.find((elt) => elt.active) || tabStatus[0];
  const handleTabClick = (tab: TabName) => () =>
    setTabStatus(
      tabStatus.map((elt) => {
        return {
          ...elt,
          active: elt.id === tab,
        };
      })
    );
  return (
    <Container>
      <Header>
        <Tabs>
          {tabStatus.map((tab) => (
            <InnerTab
              key={tab.id}
              active={tab.active}
              text={tab.text}
              onClick={handleTabClick(tab.id)}
            />
          ))}
        </Tabs>
      </Header>
      <Content>
        <Table body={props.tableContent[activeTab.id]} />
      </Content>
    </Container>
  );
};

export default SubTab;
