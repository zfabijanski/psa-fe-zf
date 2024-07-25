import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import comfortImg from "../../../../assets/images/couple-M.jpg";
import savingsImg from "../../../../assets/images/couple2-M.jpg";
import startImg from "../../../../assets/images/girl-M.jpg";
import capitalImg from "../../../../assets/images/man-M.jpg";
import retirementImg from "../../../../assets/images/old-couple-M.jpg";
import oxygenImg from "../../../../assets/images/oxygen-M.jpg";
import { ProductCategory } from "../../../../models/common";
import {
  AdequacyType,
  ProductGuid,
  ReportNameType,
  StatusType,
} from "../../types";
import AdequacyButton from "./AdequacyButton";

const productsResources = {
  [ProductGuid.Start]: {
    name: "productsPrudential.onButton.startInLife",
    image: startImg,
  },
  [ProductGuid.Comfort]: {
    name: "productsPrudential.onButton.lifeComfort",
    image: comfortImg,
  },
  [ProductGuid.Savings]: {
    name: "productsPrudential.product.savings",
    image: savingsImg,
  },
  [ProductGuid.Capital]: {
    name: "productsPrudential.product.capital",
    image: capitalImg,
  },
  [ProductGuid.Retirement]: {
    name: "productsPrudential.product.pension",
    image: retirementImg,
  },
  [ProductGuid.Oxygen]: {
    name: "productsPrudential.product.oxygen",
    image: oxygenImg,
  },
};

const defaultImg = capitalImg; // TODO: Change default image?

const getResources = (productGuid: ProductGuid) =>
  productsResources[productGuid] || {
    name: `Produkt #${productGuid}`,
    image: defaultImg,
  };

interface ICardContainerProps {
  isActive: boolean;
  isCardClickable: boolean;
}

const CardContainer = styled.div<ICardContainerProps>`
  background: white;
  position: relative;
  width: 100%;
  height: 180px;
  padding: 16px;
  flex: 1 1 750px;

  &:hover {
    > img {
      opacity: ${({ theme, isActive, isCardClickable }) =>
        isActive || !isCardClickable ? 1 : theme.opacityHover};
    }
  }
`;

const Image = styled.img`
  top: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  overflow: hidden;
  max-height: 100%;
  z-index: -1;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  color: ${({ theme }) => theme.newColors.gray100};
  margin-bottom: 55px;
`;

interface IProps {
  productGuid: ProductGuid;
  productName: string;
  productCategories: ProductCategory[];
  reportName: ReportNameType;
  isAdequate: StatusType;
  adequacyStatus: AdequacyType;
  onAdequacyClick: () => void;
  onCardClick: () => void;
  isActive: boolean;
  isCardClickable: boolean;
}

const Card: React.FC<IProps> = (props) => {
  const handleAdequacyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onAdequacyClick();
  };

  const handleCardClick = () => {
    if (props.isCardClickable) {
      props.onCardClick();
    }
  };

  const productResource = getResources(props.productGuid);

  return (
    <CardContainer
      onClick={handleCardClick}
      isActive={props.isActive}
      isCardClickable={props.isCardClickable}
      className="shadowable"
    >
      <Image src={productResource.image} />
      <Title>
        <FormattedMessage id={productResource.name} />
      </Title>
      {props.productGuid === ProductGuid.Oxygen && (
        <AdequacyButton
          adequacyStatus={props.adequacyStatus}
          isAdequate={props.isAdequate}
          productCategories={props.productCategories}
          onClick={handleAdequacyClick}
        />
      )}
    </CardContainer>
  );
};

export default Card;
