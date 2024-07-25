import React, { FC } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import ScrollableContainer from "../../../../../components/UI/ScrollableContainer/ScrollableContainer";
import Table from "../../../commons/Table/Table";
import ViewContainer from "../../../commons/ViewContainer";
import {
  additionalContractsConfig,
  headerLabels,
} from "./additionalContractsConfig";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;

  @media only screen and (max-width: 1280px) {
    height: 388px;
  }

  @media only screen and (max-width: 1024px) {
    height: 100%;
  }

  table {
    width: 100%;
    height: 100%;
    font-size: 18px;
    color: ${({ theme }) => theme.newColors.gray100};

    th {
      &:first-child {
        text-align: left;
        text-transform: unset;
        padding-left: 10px;

        @media only screen and (max-width: 1280px) {
          span {
            font-size: 22px;
          }
        }
      }
      &:not(:first-child) {
        padding: 0 4px;
        span {
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          @media only screen and (max-width: 1280px) {
            font-size: 14px;
          }
        }
      }
    }
  }
`;

interface IProps {
  title: string;
}

const AdditionalContracts: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <Container>
          <ScrollableContainer>
            <Table header={headerLabels} body={additionalContractsConfig} />
          </ScrollableContainer>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default AdditionalContracts;
