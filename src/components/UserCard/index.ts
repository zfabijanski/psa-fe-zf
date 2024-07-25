import { connect } from "react-redux";
import { RootState } from "../../AppStore";
import PersonCard from "./PersonCard";

const mapStateToProps = ({ auth }: RootState) => ({
  fullName: auth.info ? `${auth.info.givenName} ${auth.info.surname}` : "",
  image:
    auth.info &&
    auth.info.picturePath &&
    `/api/agent/picture?${auth.info.picturePath}`,
  title: auth.info ? auth.info.position : "",
});

export default connect(mapStateToProps)(PersonCard);
