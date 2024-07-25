import { FC, PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import PruText from "../../../components/UI/PruText/PruText";
import { addNonBreakingSpace } from "../../../utils/formatters";
import { WhiteSpace } from "../../../utils/types";

const Container = styled.div`
  position: relative;
  height: 600px;
  max-height: 100%;
  width: 1280px;
  display: grid;
  grid-template-rows: 100px 500px;
  grid-template-columns: 1fr;
  grid-gap: 2px;

  @media only screen and (max-width: 1280px) {
    width: 100%;
    grid-template-rows: 80px 1fr;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    margin-top: 20px;
    grid-template-rows: 100px 500px;
  }
`;

const Title = styled.div`
  background-color: ${({ theme }) => theme.newColors.white100};
  border-radius: 7px 7px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 25px 17px;

  span {
    line-height: 1.44;

    &:nth-child(2) {
      padding-top: 5px;
    }
  }

  @media only screen and (max-width: 1280px) {
    padding: 10px 20px 10px;
    span {
      font-size: 15px;
      line-height: 1.1;
    }
  }
`;

const Content = styled.div<{
  contentBottomPadding?: boolean;
}>`
  ${(props) => `padding-bottom: ${props.contentBottomPadding ? "20px" : 0} ;`}
  background-color: ${({ theme }) => theme.newColors.white100};
  border-radius: 0 0 7px 7px;
`;

interface IProps {
  title: string;
  subtitle?: string;
  contentBottomPadding?: boolean;
}

const ViewContainer: FC<PropsWithChildren<IProps>> = (props) => {
  const intl = useIntl();
  return (
    <Container>
      <Title>
        <PruText fontWeight={"700"} fontSize={18}>
          {addNonBreakingSpace(
            intl.formatMessage({ id: props.title }),
            WhiteSpace.NonBreakingSpace
          )}
        </PruText>
        {props.subtitle && (
          <PruText fontWeight={"600"} fontSize={18}>
            {addNonBreakingSpace(
              intl.formatMessage({ id: props.subtitle }),
              WhiteSpace.NonBreakingSpace
            )}
          </PruText>
        )}
      </Title>
      <Content contentBottomPadding={props.contentBottomPadding}>
        {props.children}
      </Content>
    </Container>
  );
};

export default ViewContainer;
