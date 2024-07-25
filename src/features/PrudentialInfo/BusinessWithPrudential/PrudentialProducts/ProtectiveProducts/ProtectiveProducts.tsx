import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import PruText from "../../../../../components/UI/PruText/PruText";
import ViewContainer from "../../../commons/ViewContainer";
import ProductCard from "../ProductCard";
import ProductContainer from "../ProductContainer";

import LifeComfortImage from "../../../../../assets/images/lifeComfortTiny.png";

const Container = styled.div`
  height: 100%;
  padding: 50px;
  display: inline-block;
`;

const ProductDetailsList = styled.ul`
  text-align: justify;
  padding-left: 20px;
`;

interface IProps {
  title: string;
  subtitle?: string;
}

const ProtectiveProducts: FC<IProps> = ({ title }) => {
  const protectiveProductsBullets = [
    "prudentialProducts.mainContract.protective.text1",
    "prudentialProducts.mainContract.protective.text2",
    "prudentialProducts.mainContract.protective.text3",
  ];

  const protectiveProductsModalContent = {
    header: { id: "prudentialProducts.mainContract.protective.title" },
    confirmText: { id: "confirmWindow.ok" },
    showCancel: false,
    children: (
      <ProductDetailsList>
        {protectiveProductsBullets.map((text) => (
          <li key={text}>
            <PruText fontWeight={"600"} fontSize={18}>
              <FormattedMessage id={text} />
            </PruText>
          </li>
        ))}
      </ProductDetailsList>
    ),
  };

  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <Container>
          <ProductContainer
            modalContent={protectiveProductsModalContent}
            title={"prudentialProducts.mainContract.protective.title"}
          >
            <ProductCard
              label={"prudentialProducts.mainContract.lifeComfort"}
              image={LifeComfortImage}
            />
          </ProductContainer>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default ProtectiveProducts;
