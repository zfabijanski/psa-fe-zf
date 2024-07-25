import { connect } from "react-redux";
import { RootState } from "../../../AppStore";
import { resolveErrorMessage } from "../errorMessageResolver";
import { CoversPanel } from "./CoversPanel";

const mapStateToProps = (state: RootState) => {
  const {
    calculator: {
      current: { productGuid },
    },
    translations,
  } = state;

  const errorMessageResolver = resolveErrorMessage(
    productGuid,
    translations.translations[translations.currentLocale]
  );

  return {
    resolveErrorMessage: errorMessageResolver,
  };
};

export default connect(mapStateToProps)(CoversPanel);
