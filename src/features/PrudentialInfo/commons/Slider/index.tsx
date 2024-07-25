import { connect } from "react-redux";
import { prolongUserSession } from "slices/auth";
import Slider from "./Slider";

export default connect(null, { prolongUserSession })(Slider);
