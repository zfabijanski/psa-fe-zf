import { connect } from "react-redux";
import { IProductConfig } from "../../models/common";
import {
  calculate,
  handleIllustrationExit,
  illustrateAndPreviewCalculation,
  openCalculation,
  removeCalculation,
  setCalculation,
  setCalculationStatus,
  showUnillustratedCalculationsWarning,
} from "slices/calculator";
import { removeIllustration } from "slices/illustrations";
import { RootState } from "../../AppStore";
import { getCoversConfigMap } from "../../utils/selectors";
import CalculatorContainer from "./CalculatorContainer";

const emptyProductsConfigItem: IProductConfig = {
  product_name: "",
  product_guid: 0,
  product_categories: [],
  product_freqs: [],
  product_covers: [],
  product_funds: [],
};

const mapStateToProps = (state: RootState) => {
  const {
    calculator: {
      current: { productGuid, index },
      calculations,
      calculationsState,
    },
    productsConfig,
    illustrations,
    productCoversLimits,
  } = state;

  const productConfigItem =
    productsConfig.items.find(
      ({ product_guid }) => product_guid === productGuid
    ) || emptyProductsConfigItem;

  return {
    index,
    productGuid,
    coversConfigMap: getCoversConfigMap(state),
    coversLimits: productCoversLimits.items[productGuid],
    calculations: calculations[productGuid] || [],
    productConfigItem,
    calculationsState,
    isIllustrationPreviewed: illustrations.previewedCalculationId !== undefined,
  };
};

const mapDispatchToProps = {
  openCalculation,
  removeIllustration,
  removeCalculation,
  setCalculation,
  calculate,
  setCalculationStatus,
  previewIllustration: illustrateAndPreviewCalculation,
  showUnillustratedCalculationsWarning,
  handleIllustrationExit,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorContainer);
