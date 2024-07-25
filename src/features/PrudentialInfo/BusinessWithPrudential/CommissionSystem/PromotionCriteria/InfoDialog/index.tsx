import React, { FC } from "react";
import styled from "styled-components/macro";
import ScrollableContainer from "../../../../../../components/UI/ScrollableContainer/ScrollableContainer";
import TextContainer from "../../../../commons/TextContainer";
import { IDetails } from "../types";
import DialogRow from "./DialogRow";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.newColors.white100};
    white-space: pre-wrap;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.newColors.primary100};
  border-radius: 8px 8px 0 0;
  @media only screen and (max-width: 1280px) {
    span {
      font-size: 22px;
    }
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.newColors.gray100};
  border-radius: 0 0 8px 8px;
  height: 100%;

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }
`;

const Dialog = styled.div`
  height: 440px;
  width: 90%;
  border-radius: 8px;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr;
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1),
    0 6px 30px 5px rgba(0, 0, 0, 0.05), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
  z-index: 20;

  @media only screen and (max-width: 1280px) {
    height: 360px;
    grid-template-rows: 35px 1fr;
  }

  @media only screen and (max-width: 1024px) {
    height: 390px;
  }
`;

const CustomScrollableContainer = styled(ScrollableContainer)`
  height: auto;
  background-color: ${({ theme }) => theme.newColors.gray100};
  border-radius: 0 0 8px 8px;
`;

const SectionTitle = styled.div`
  background-color: ${({ theme }) => theme.newColors.primary100};
  margin: 6px;
  text-align: center;
  border-radius: 8px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  details: IDetails;
}

const InfoDialog: FC<IProps> = ({ details }) => {
  const { details: sections } = details;
  return (
    <Container>
      <Dialog>
        <Header>
          <TextContainer fontSize={26} translationKey={details.header} />
        </Header>
        <CustomScrollableContainer>
          <Content>
            {sections.map((elt) =>
              elt.rows.map((row, rowIndex) => (
                <div key={`row${row.col1}`}>
                  {rowIndex === 0 && elt.title && (
                    <SectionTitle>
                      <TextContainer
                        fontSize={18}
                        fontWeight={"600"}
                        translationKey={elt.title}
                      />
                    </SectionTitle>
                  )}
                  <DialogRow
                    key={row.col1}
                    lastRow={rowIndex === elt.rows.length - 1}
                    {...row}
                  />
                </div>
              ))
            )}
          </Content>
        </CustomScrollableContainer>
      </Dialog>
    </Container>
  );
};

export default InfoDialog;
