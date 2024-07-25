import React, { FC } from "react";
import styled from "styled-components/macro";
import TextColumn from "./TextColumn";
import { ITextColumnContent } from "./types";

const Container = styled.div<Pick<IProps, "hasDescription">>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 100px;
  height: 100%;
  align-content: ${({ hasDescription }) =>
    hasDescription ? "initial" : "center"};

  img {
    max-width: 100%;
    align-self: center;
  }

  @media only screen and (max-width: 1280px) {
    padding: 15px;
    grid-gap: 20px;
    img {
      width: 85%;
      justify-self: ${({ hasDescription }) =>
        hasDescription ? "center" : "initial"};
    }
  }

  @media only screen and (max-width: 1024px) {
    padding: 0 15px;

    img {
      width: 100%;
    }
  }
`;

interface IProps {
  image: string;
  content: ITextColumnContent[];
  boldLabels?: boolean;
  hasDescription?: boolean;
}

const ImageWithTextContainer: FC<IProps> = ({
  image,
  content,
  boldLabels,
  hasDescription,
}) => {
  return (
    <Container hasDescription={hasDescription}>
      <TextColumn
        content={content}
        boldLabels={boldLabels}
        hasDescription={hasDescription}
      />
      <img src={image} alt="" />
    </Container>
  );
};

export default ImageWithTextContainer;
