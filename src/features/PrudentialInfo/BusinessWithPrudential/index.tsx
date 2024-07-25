import { connect } from "react-redux";
import { RootState } from "../../../AppStore";
import { aboutPrudentialSlides } from "../AboutPrudential/aboutPrudentialSlides";
import Slider from "../commons/Slider";
import { businessModelSlides } from "./BusinessModel/businessModelSlides";
import { commissionSystemSlides } from "./CommissionSystem/commissionSystemSlides";
import { eappSlides } from "./EApp/eappSlides";
import { prudentialProductsSlides } from "./PrudentialProducts/prudentialProductsSlides";

const slides = [
  ...aboutPrudentialSlides,
  ...businessModelSlides,
  ...prudentialProductsSlides,
  ...commissionSystemSlides,
  ...eappSlides,
];

const mapStateToProps = ({ businessWithPrudential }: RootState) => ({
  startSlide: businessWithPrudential.slideId,
  slides,
  pageNamePrefix: "businessWithPrudential.title",
});

export default connect(mapStateToProps)(Slider);
