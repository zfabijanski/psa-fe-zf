import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../AppStore";
import { Loader } from "../Loader/Loader";

interface IProps {
  active: boolean;
}

const FullscreenSpinnerContainer = ({ active }: IProps) => (
  <>{active && <Loader />}</>
);

const mapStateToProps = ({ fullscreenSpinner }: RootState) => ({
  active: fullscreenSpinner.active,
});

export default connect(mapStateToProps)(FullscreenSpinnerContainer);
