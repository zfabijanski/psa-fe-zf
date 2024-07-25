import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Icon } from "../../../components/UI/Icon";
import { TypoH3, TypoSubheader } from "../../../components/UI/typography";
import { ProductCategory } from "../../../models/common";
import { CoverCategory } from "slices/coversConfig";
import { GridColumn, GridRow } from "../components/CalculatorGrid";
import CoverWrapper from "../CoverWrapper";
import { ICoverProps } from "../CoverWrapper/CoverWrapper";
import { ValueType } from "../types";
import { getFieldsConfiguration } from "./config";
import { FundsFields } from "./FundsFields";
import { InvestmentFields } from "./InvestmentFields";
import { ProtectiveFields } from "./ProtectiveFields";
import { SavingsFields } from "./SavingsFields";
import { IFieldsProps } from "./types";

interface IProps
  extends ICoverProps,
    Pick<IFieldsProps, "coverLimits" | "resolveErrorMessage"> {
  productName: string;
  productCategories: ProductCategory[];
}

const MainCoverDiv = styled.div`
  background: ${({ theme }) => theme.newColors.primary100};
  color: ${({ theme }) => theme.newColors.white100};
  padding: 13px 48px;
`;

const RowWrapper = styled(GridRow)`
  align-items: flex-start;
`;

const ProductName = styled(TypoH3)`
  margin-top: 8px;
`;

const ProductLabel = styled(TypoSubheader)`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
`;

const MainCover: React.FC<IProps> = (props) => {
  const renderComponent = (
    outdatedFields: string[],
    handleSetFieldValue: (key: string, value: ValueType) => void
  ) => {
    const { productCategories, productName, values } = props;

    if (!values) {
      return null;
    }

    const fieldsConfig = getFieldsConfiguration(productCategories);
    const FieldsComponent = getFieldsComponent(productCategories);

    return (
      <MainCoverDiv>
        <RowWrapper>
          <GridColumn span={fieldsConfig.product.span}>
            <ProductLabel>
              <Icon color="white100" width={16} name="file-text" />
              <FormattedMessage id={fieldsConfig.product.id} />
            </ProductLabel>
            <ProductName>{productName}</ProductName>
          </GridColumn>
          <FieldsComponent
            {...props}
            values={values}
            setFieldValue={handleSetFieldValue}
            fieldsConfig={fieldsConfig}
            outdatedFields={outdatedFields}
          />
        </RowWrapper>
      </MainCoverDiv>
    );
  };

  return (
    <CoverWrapper
      coverMainCategory={CoverCategory.Main}
      {...props}
      renderComponent={renderComponent}
    />
  );
};

const getFieldsComponent = (productCategories: ProductCategory[]) => {
  if (productCategories.includes(ProductCategory.Savings)) {
    return SavingsFields;
  } else if (productCategories.includes(ProductCategory.Investment)) {
    return InvestmentFields;
  } else if (productCategories.includes(ProductCategory.Funds)) {
    return FundsFields;
  } else {
    return ProtectiveFields;
  }
};

export default MainCover;
