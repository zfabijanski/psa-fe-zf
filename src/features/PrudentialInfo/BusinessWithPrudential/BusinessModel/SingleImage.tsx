import React, { FC } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import ViewContainer from "../../commons/ViewContainer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    max-height: 100%;
  }

  @media only screen and (max-width: 1280px) {
    img {
      width: 55%;
    }
  }

  @media only screen and (max-width: 1024px) {
    img {
      width: 100%;
      padding: 15px;
    }
  }
`;

interface IProps {
  image: string;
  title: string;
  subtitle?: string;
}

const SingleImage: FC<IProps> = ({ image, title, subtitle }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title} subtitle={subtitle}>
        <Container>
          <img src={image} alt={title} />
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default SingleImage;
