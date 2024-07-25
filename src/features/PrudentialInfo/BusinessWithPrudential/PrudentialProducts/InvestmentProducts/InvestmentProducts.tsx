import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import PruText from "../../../../../components/UI/PruText/PruText";
import ViewContainer from "../../../commons/ViewContainer";
import ProductCard from "../ProductCard";
import ProductContainer from "../ProductContainer";

import OxygenBalancedImage from "../../../../../assets/images/oxygenBalancedTiny.png";

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

const InvestmentProducts: FC<IProps> = ({ title }) => {
  const investmentProductsBullets = [
    "prudentialProducts.mainContract.investment.text1",
    "prudentialProducts.mainContract.investment.text2",
    "prudentialProducts.mainContract.investment.text3",
    "prudentialProducts.mainContract.investment.text4",
    "prudentialProducts.mainContract.investment.text5",
    "prudentialProducts.mainContract.investment.text6",
    "prudentialProducts.mainContract.investment.text7",
    "prudentialProducts.mainContract.investment.text8",
  ];

  const investmentProductsModalContent = {
    header: { id: "prudentialProducts.mainContract.investment.title" },
    confirmText: { id: "confirmWindow.ok" },
    showCancel: false,
    children: (
      <ProductDetailsList>
        {investmentProductsBullets.map((text) => (
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
            title={"prudentialProducts.mainContract.investment.title"}
            modalContent={investmentProductsModalContent}
          >
            <ProductCard
              label={"prudentialProducts.mainContract.oxygenBalanced"}
              image={OxygenBalancedImage}
            />
          </ProductContainer>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default InvestmentProducts;
