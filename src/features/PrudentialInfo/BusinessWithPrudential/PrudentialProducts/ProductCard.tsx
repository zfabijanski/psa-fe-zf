import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PruText from "../../../../components/UI/PruText/PruText";

const Container = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(173, 173, 173, 0.62);
  box-shadow: 0px 0px 10px 0px rgba(173, 173, 173, 0.62);

  span {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    text-align: center;
    white-space: pre-wrap;
    background-color: ${({ theme }) => theme.newColors.white100};
    border-radius: 7px 7px 0px 0px;
  }

  img {
    border-radius: 0px 0px 7px 7px;
  }

  @media only screen and (max-width: 1280px) {
    width: 17vw;

    span {
      font-size: 16px;
      height: 60px;
    }
  }

  @media only screen and (max-width: 1024px) {
    width: calc(1024px * 0.17);
  }
`;

interface IProps {
  label: string;
  image: string;
}

const ProductCard: FC<IProps> = ({ label, image }) => {
  return (
    <Container>
      <PruText fontSize={18} fontWeight={"700"}>
        <FormattedMessage id={label} />
      </PruText>
      <img src={image} alt={label} />
    </Container>
  );
};

export default ProductCard;
