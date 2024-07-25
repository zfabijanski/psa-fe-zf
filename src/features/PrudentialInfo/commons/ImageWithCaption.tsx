import React, { FC } from "react";
import styled from "styled-components/macro";
import ImageWithTextContainer from "./ImageWithTextContainer";
import TextContainer from "./TextContainer";
import { ITextColumnContent } from "./types";

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Hint = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;

  @media only screen and (max-width: 1280px) {
    margin: 0 10px 0 0;
    span {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 1024px) {
    margin: 10px;
  }
`;

interface IProps {
  content: ITextColumnContent[];
  hint: string;
  image: string;
  boldLabels?: boolean;
  hasDescription?: boolean;
}

const ImageWithCaption: FC<IProps> = ({
  content,
  boldLabels,
  hasDescription,
  hint,
  image,
}) => {
  return (
    <Container>
      <ImageWithTextContainer
        content={content}
        image={image}
        boldLabels={boldLabels}
        hasDescription={hasDescription}
      />
      <Hint>
        <TextContainer fontWeight={"600"} fontSize={16} translationKey={hint} />
      </Hint>
    </Container>
  );
};

export default ImageWithCaption;
