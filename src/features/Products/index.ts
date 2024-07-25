import { connect } from "react-redux";
import { getCoversConfig } from "slices/coversConfig";
import { getFundRiskProfilesConfig } from "slices/fundRiskProfilesConfig";
import { getIllustrations } from "slices/illustrations";
import {
  clearActiveProduct,
  getProducts,
  goToAdequacy,
  setActiveProduct,
} from "slices/products";
import { getProductsConfig } from "slices/productsConfig";
import { RootState } from "../../AppStore";
import {
  getProductsConfigMap,
  getProductsWithIllustrations,
} from "../../utils/selectors";
import Products from "./Products";

const mapStateToProps = (state: RootState) => ({
  products: getProductsWithIllustrations(state),
  productsConfig: getProductsConfigMap(state),
  activeProductGuid: state.products.activeProductGuid,
  isIllustrationPreviewed:
    state.illustrations.previewedCalculationId !== undefined,
  isNeedsAnalysisDone: !!(
    state.illustrations.items[0] &&
    state.illustrations.items[0].json_needs_analysis &&
    state.illustrations.items[0].json_needs_analysis.preliminary.incomeSource
  ),
});

const mapDispatchToProps = {
  getProducts,
  getIllustrations,
  onAdequacyClick: goToAdequacy,
  onProductClick: setActiveProduct,
  clearActiveProduct,
  getCoversConfig,
  getProductsConfig,
  getFundRiskProfilesConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
