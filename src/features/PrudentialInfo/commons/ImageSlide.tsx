import React from "react";
import styled from "styled-components/macro";

interface IProps {
  src: string;
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.newColors.white100};
  object-fit: contain;
  margin: 0 auto;
`;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 1280px;
  height: 600px;
  padding: 0 48px;

  @media only screen and (max-width: 1280px) {
    width: 100%;
  }
`;

export const ImageSlide = ({ src }: IProps) => (
  <Container>
    <Image src={src} />
  </Container>
);
