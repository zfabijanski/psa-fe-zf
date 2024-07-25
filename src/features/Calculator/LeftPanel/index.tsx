import { connect } from "react-redux";
import { setCalculationFeatureChanged } from "slices/calculator";
import { RootState } from "../../../AppStore";
import { resolveErrorMessage } from "../errorMessageResolver";
import { LeftPanel } from "./LeftPanel";
import { IProductsProps } from "./types";

const mapStateToProps = (
  state: RootState,
  {
    values: {
      mainCover: { code },
    },
  }: Omit<IProductsProps, "resolveErrorMessage">
) => {
  const {
    calculator: {
      current: { productGuid, index },
    },
    translations,
    productsConfig: { items: productConfigurations },
  } = state;
  const productItem = productConfigurations.find(
    (prodConfig) => prodConfig.product_guid === productGuid
  );
  const productFrequencies = productItem ? productItem.product_freqs : [];
  const mainInsuredAgeMinMax = (
    (state.productCoversLimits.items[state.calculator.current.productGuid] ||
      {})[code] || {}
  ).insuredAge;

  const errorMessageResolver = resolveErrorMessage(
    productGuid,
    translations.translations[translations.currentLocale]
  );

  return {
    productGuid,
    productFrequencies,
    resolveErrorMessage: errorMessageResolver,
    index,
    mainInsuredAgeMinMax,
  };
};

const mapDispatchToProps = {
  setCalculationFeatureChanged(calculationId: number) {
    return setCalculationFeatureChanged({ calculationId });
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
