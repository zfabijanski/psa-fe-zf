import { FormikActions, FormikState } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import { IProductConfig } from "../../../models/common";
import { ProductI18nMap } from "../../Products/types";
import CoversPanel from "../CoversPanel";
import LeftPanel from "../LeftPanel";
import { ICalculationVM } from "../types";
import { Box, Flex } from "components/UI/Box";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICalculationVM>, "errors" | "values"> {
  productsConfigItem: IProductConfig;
}

export const Calculator: React.FC<IProps> = ({
  setFieldValue,
  values,
  errors,
  productsConfigItem,
}) => {
  const intl = useIntl();
  return (
    <Flex css={{ height: "100%", width: "100%" }}>
      <Box css={{ height: "100%", width: "100%" }}>
        <LeftPanel
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
          productCategories={productsConfigItem.product_categories}
        />
        <CoversPanel
          productName={intl.formatMessage(
            ProductI18nMap[productsConfigItem.product_guid] || {
              id: `Produkt #${productsConfigItem.product_guid}`,
            }
          )}
          productCategories={productsConfigItem.product_categories}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      </Box>
    </Flex>
  );
};
