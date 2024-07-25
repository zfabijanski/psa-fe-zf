import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import infoIcon from "assets/icons/information-black-lightgray.svg";
import PageElementWrapper from "components/UI/PageElementWrapper";
import Tab from "../../../commons/Tab";
import ViewContainer from "../../../commons/ViewContainer";
import {
  protectiveAndSavingsData,
  protectiveData,
} from "./basicCommissionConfig";
import InfoContainer from "./InfoContainer";
import TimeLine from "./TimeLine";

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-template-rows: 1fr;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 4px solid ${({ theme }) => theme.colors.lightGray};
  margin-left: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 1fr;
  position: relative;

  @media only screen and (max-width: 1280px) {
    grid-template-rows: 3fr 1fr;
  }

  @media only screen and (max-width: 1024px) {
    grid-template-rows: 4fr 1fr;
  }
`;

interface ITabStatus {
  id: "tab1" | "tab2";
  text: string;
  active: boolean;
  from: number;
  to: number;
}

const Info = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-items: flex-end;
  justify-self: center;
  align-self: center;

  &:hover {
    cursor: pointer;
  }
`;

interface IProps {
  title: string;
  openModal: (message: string) => void;
}

const BasicProvision: FC<IProps> = ({ title, openModal }) => {
  const intl = useIntl();
  const [duration, setDuration] = useState(20);
  const [tabStatus, setTabStatus] = useState<ITabStatus[]>([
    {
      id: "tab1",
      text: "commissionSystem.basicCommission.tab1",
      active: true,
      from: 10,
      to: 30,
    },
    {
      id: "tab2",
      text: "commissionSystem.basicCommission.tab2",
      active: false,
      from: 5,
      to: 30,
    },
  ]);

  const handleTimelineChange = (value: number) => {
    setDuration(value);
  };

  const handleTabClick = (tab: "tab1" | "tab2") => () =>
    setTabStatus(
      tabStatus.map((elt) => {
        return {
          ...elt,
          active: elt.id === tab,
        };
      })
    );
  const { from, to } = tabStatus.find((elt) => elt.active) || tabStatus[0];
  const handleOpenModal = () => {
    const text1 = intl.formatMessage({
      id: "commissionSystem.basicCommission.modal.content1",
    });
    const text2 = intl.formatMessage({
      id: "commissionSystem.basicCommission.modal.content2",
    });
    const text3 = intl.formatMessage({
      id: "commissionSystem.basicCommission.modal.content3",
    });
    openModal(`${text1}<br/><br/>${text2}<br/><br/>${text3}`);
  };

  const getDataSet = () => {
    const activeTab = tabStatus.find((elt) => elt.active);
    return activeTab && activeTab.id === "tab1"
      ? protectiveAndSavingsData
      : protectiveData;
  };

  const calculateTranslationPercentage = (newDuration: number): number => {
    const activeTab = tabStatus.find((elt) => elt.active) || tabStatus[0];
    if (duration === activeTab.from) {
      return -95;
    } else if (duration === activeTab.to) {
      return 95;
    }
    const center = (activeTab.to - activeTab.from + 1) / 2;
    const currentPosition = newDuration - activeTab.from + 1;
    const translationWidthPercentage = Math.floor(
      (Math.floor(currentPosition - center) / center) * 100
    );
    return translationWidthPercentage;
  };

  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <Container>
          <Header>
            <Tabs>
              {tabStatus.map((tab) => (
                <Tab
                  key={tab.id}
                  active={tab.active}
                  text={tab.text}
                  onClick={handleTabClick(tab.id)}
                />
              ))}
            </Tabs>
            <Info onClick={handleOpenModal}>
              <img src={infoIcon} alt="info" />
            </Info>
          </Header>
          <Content>
            <InfoContainer
              duration={duration}
              dataSet={getDataSet()}
              calculateTranslation={calculateTranslationPercentage}
            />
            <TimeLine
              rangeFrom={from}
              rangeTo={to}
              value={duration}
              onChange={handleTimelineChange}
            />
          </Content>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default BasicProvision;
