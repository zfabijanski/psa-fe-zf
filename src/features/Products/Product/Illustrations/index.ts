import { connect } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { openCalculation } from "slices/calculator";
import {
  getIllustrations,
  previewIllustration,
  removeIllustration,
} from "slices/illustrations";
import { setActiveProduct } from "slices/products";
import Illustrations from "./Illustrations";

interface IOwnProps {
  productGuid: number;
  isInLastProduct: boolean;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  { productGuid }: IOwnProps
) => ({
  removeIllustration: (calculationId: number) =>
    dispatch(
      removeIllustration({
        calculationId,
        callback: () => dispatch(getIllustrations()),
      })
    ),
  previewIllustration: (calculationId: number) =>
    dispatch(previewIllustration(calculationId)),
  onIllustrationClick: () => dispatch(setActiveProduct(productGuid)),
  openCalculation: (index = 0) =>
    dispatch(openCalculation({ productGuid, index, forceRefresh: true })),
});

export default connect(null, mapDispatchToProps)(Illustrations);
