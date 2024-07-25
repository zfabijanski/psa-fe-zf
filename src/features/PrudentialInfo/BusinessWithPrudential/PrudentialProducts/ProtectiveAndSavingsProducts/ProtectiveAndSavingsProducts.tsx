import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import PruText from "../../../../../components/UI/PruText/PruText";
import ViewContainer from "../../../commons/ViewContainer";
import ProductCard from "../ProductCard";
import ProductContainer from "../ProductContainer";

import LifeStartImage from "../../../../../assets/images/lifeStartTiny.png";
import RetirementImage from "../../../../../assets/images/retirementTiny.png";
import SafeCapitalImage from "../../../../../assets/images/safeCapitalTiny.png";
import SavingsImage from "../../../../../assets/images/savingsTiny.png";

const Container = styled.div`
  height: 100%;
  padding: 50px;
  width: 100%;
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

const ProtectiveAndSavingProducts: FC<IProps> = ({ title }) => {
  const protectiveAndSavingProductsBullets = [
    "prudentialProducts.mainContract.protectiveAndSavings.text1",
    "prudentialProducts.mainContract.protectiveAndSavings.text2",
    "prudentialProducts.mainContract.protectiveAndSavings.text3",
    "prudentialProducts.mainContract.protectiveAndSavings.text4",
    "prudentialProducts.mainContract.protectiveAndSavings.text5",
    "prudentialProducts.mainContract.protectiveAndSavings.text6",
    "prudentialProducts.mainContract.protectiveAndSavings.text7",
  ];

  const protectiveAndSavingProductsModalContent = {
    header: {
      id: "prudentialProducts.mainContract.protectiveAndSavings.title",
    },
    confirmText: { id: "confirmWindow.ok" },
    showCancel: false,
    children: (
      <ProductDetailsList>
        {protectiveAndSavingProductsBullets.map((text) => (
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
            modalContent={protectiveAndSavingProductsModalContent}
            justifyContent={"space-between"}
            title={"prudentialProducts.mainContract.protectiveAndSavings.title"}
          >
            <ProductCard
              label={"prudentialProducts.mainContract.startInLife"}
              image={LifeStartImage}
            />
            <ProductCard
              label={"prudentialProducts.mainContract.pension"}
              image={RetirementImage}
            />
            <ProductCard
              label={"prudentialProducts.mainContract.savings"}
              image={SavingsImage}
            />
            <ProductCard
              label={"prudentialProducts.mainContract.safeCapital"}
              image={SafeCapitalImage}
            />
          </ProductContainer>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default ProtectiveAndSavingProducts;
