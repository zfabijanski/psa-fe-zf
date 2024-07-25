import React from "react";
import styled from "styled-components";
import LoadingSpinner from "components/UI/LoadingSpinner";

const Container = styled.div`
  position: relative;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  margin-top: -32px;
`;

interface IProps {
  isLoading: boolean;
  shouldDisplayIndicator: boolean;
  onClick: () => void;
}

type Navigation = (
  Indicator: React.ComponentType<Pick<IProps, "onClick">>
) => (props: IProps) => React.ReactElement;

const withSpinner: Navigation = (Indicator) => (props) =>
  (
    <Container>
      {props.isLoading && (
        <SpinnerContainer>
          <LoadingSpinner />
        </SpinnerContainer>
      )}
      {props.shouldDisplayIndicator && <Indicator onClick={props.onClick} />}
    </Container>
  );

export default withSpinner;
