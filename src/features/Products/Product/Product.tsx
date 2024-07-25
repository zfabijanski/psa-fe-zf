import React from "react";
import { FocusOn } from "react-focus-on";
import styled from "styled-components";
import { ProductCategory } from "../../../models/common";
import { theme } from "../../../theme/theme";
import { IProductWithIllustrations } from "../types";
import Card from "./Card/Card";
import Illustrations from "./Illustrations";

const Container = styled.div`
  position: relative;
  padding-bottom: 20px;

  :first-child {
    padding-top: 20px;
  }
`;

const ProductRow = styled.div<
  Pick<IProps, "isActive"> & { withAddNew: boolean; isCardClickable: boolean }
>`
  display: grid;
  grid-template-columns: minmax(461px, 46%) ${({ withAddNew }) =>
      withAddNew ? "140px" : "1fr"} 1fr 1fr;
  grid-column-gap: 12px;

  .shadowable {
    cursor: ${(props) => props.isCardClickable && "pointer"};
    z-index: ${({ isActive }) => (isActive ? 100 : 0)};
    box-shadow: ${({ isActive }) => `
    0 2px 10px 0 rgba(0, 0, 0, ${isActive ? 0.5 : 0})`};
  }
`;

interface IProps {
  product: IProductWithIllustrations;
  productCategories: ProductCategory[];
  onProductClick: () => void;
  onAdequacyClick: () => void;
  isActive: boolean;
  isInLastProduct: boolean;
}

const Product: React.FC<IProps> = (props) => {
  const haveAnyNotNullIllustration = () =>
    props.product.illustrations.some(
      (illustration) => illustration.pru_calc_calculation_id !== null
    );

  return (
    <Container>
      <FocusOn enabled={props.isActive} noIsolation={true}>
        <ProductRow
          isActive={props.isActive}
          withAddNew={props.product.illustrations.length < 3}
          isCardClickable={haveAnyNotNullIllustration()}
        >
          <Card
            productGuid={props.product.product_guid}
            productName={props.product.product_name}
            productCategories={props.productCategories}
            reportName={props.product.raport_name}
            adequacyStatus={props.product.adequacy_status}
            isAdequate={props.product.product_is_adequate}
            onCardClick={props.onProductClick}
            onAdequacyClick={props.onAdequacyClick}
            isActive={props.isActive}
            isCardClickable={haveAnyNotNullIllustration()}
          />
          <Illustrations
            productGuid={props.product.product_guid}
            colors={[
              theme.newColors.primary100,
              theme.newColors.violet,
              theme.newColors.secondary100,
            ]}
            illustrations={props.product.illustrations}
            isActive={props.isActive}
            isInLastProduct={props.isInLastProduct}
          />
        </ProductRow>
      </FocusOn>
    </Container>
  );
};

export default Product;
