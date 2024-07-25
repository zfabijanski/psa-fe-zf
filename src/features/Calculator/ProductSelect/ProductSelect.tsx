import React, { FC, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Select } from "../../../components/UI/Select";
import { openCalculation } from "slices/calculator";
import { RootState } from "../../../AppStore";
import { ProductI18nMap } from "../../Products/types";

interface IProps {
  productGuids: number[]; // @TODO: CHECK ME
  productGuid?: number;
  openCalculation: (params: { productGuid: number; index: number }) => void;
  onChange?: (productGuid: number) => void;
}

const Wrapper = styled(Select)`
  width: 100%;
  max-width: 360px;
`;

const ProductSelect: FC<IProps> = (props) => {
  const value = useMemo(
    () => String(props.productGuid) || "",
    [props.productGuid]
  );

  const handleDropdownChange = useCallback(
    (dropdownValue: string) => {
      const productGuid = parseInt(dropdownValue, 10);
      if (props.onChange) {
        props.onChange(productGuid);
      }
      props.openCalculation({ productGuid, index: 0 });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.openCalculation, props.onChange]
  );

  return (
    <Wrapper
      value={value}
      onChange={handleDropdownChange}
      options={props.productGuids.map((productGuid) => ({
        value: productGuid ? productGuid.toString() : "",
        labelTrKey:
          ProductI18nMap[productGuid]?.id || `Produkt #${productGuid}`,
      }))}
    />
  );
};

const mapDispatchToProps = {
  openCalculation,
};

const mapStateToProps = ({ products: { items } }: RootState) => ({
  productGuids: items.map((product) => product.product_guid),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSelect);
