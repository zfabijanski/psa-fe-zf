import React, { FC } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import TextContainer from "../../commons/TextContainer";
import ViewContainer from "../../commons/ViewContainer";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20% 1fr;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 20px 0 60px;

    li {
      position: relative;
      margin-bottom: 20px;
    }
  }

  li::before {
    content: "•";
    position: absolute;
    left: -20px;
    font-size: 20px;
    color: ${({ theme }) => theme.newColors.primary100};
  }

  @media only screen and (max-width: 1280px) {
    li span {
      font-size: 16px;
    }
  }

  @media only screen and (max-width: 1240px) {
    grid-template-rows: 15% 1fr;
  }
`;

const Title = styled.div`
  padding: 40px 0 20px 40px;
  span {
    text-align: center;
    color: ${({ theme }) => theme.newColors.gray100};
  }

  @media only screen and (max-width: 1280px) {
    padding: 20px 0 0 40px;
    span {
      padding: 5px;
      font-size: 20px;
    }
  }
`;

interface IProps {
  title: string;
}

const bullets = [
  "commissionSystem.maintenanceCriteria.bullet1",
  "commissionSystem.maintenanceCriteria.bullet2",
  "commissionSystem.maintenanceCriteria.bullet3",
  "commissionSystem.maintenanceCriteria.bullet4",
];

const MaintenanceCriteria: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <Container>
          <Title>
            <TextContainer
              fontSize={26}
              translationKey={"commissionSystem.maintenanceCriteria.header"}
            />
          </Title>
          <ul>
            {bullets.map((bullet) => (
              <li key={bullet}>
                <TextContainer
                  fontWeight={"600"}
                  fontSize={18}
                  translationKey={bullet}
                />
              </li>
            ))}
          </ul>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default MaintenanceCriteria;
