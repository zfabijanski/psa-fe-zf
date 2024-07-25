import { connect } from "react-redux";
import { RootState } from "../../AppStore";
import Mail from "./Mail";

const mapStateToProps = ({ mail }: RootState) => ({
  status: mail.status,
});

export default connect(mapStateToProps)(Mail);
