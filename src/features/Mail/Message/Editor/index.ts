import get from "lodash/get";
import { connect } from "react-redux";
import { getCalculationValues } from "slices/calculator";
import {
  IFields,
  changeEditorField,
  changeEditorFieldValidationError,
  getSignatureIfNeeded,
  setHasPesel,
  toggleShouldSendDocsByMail,
  updateFirstNameInDb,
} from "slices/mail";
import { refetchCurrentMeetingIfNeeded } from "slices/meetings";
import { RootState } from "../../../../AppStore";
import {
  getAdditionalMailFieldsFromMeetingStatus,
  getCurrentMeetingClientName,
} from "slices/meetings";
import EditorContainer from "./EditorContainer";

const mapStateToProps = ({
  mail,
  meetings,
  products,
  calculator,
}: RootState) => {
  const productGuid =
    get(calculator, "current.productGuid") ||
    get(products, "items.0.product_guid") ||
    null;

  const dateOfBirth = get(
    calculator,
    `calculations[${productGuid}].0.mainInsured.dateOfBirth`,
    ""
  );

  return {
    shouldSendDocsByMail: mail.shouldSendDocsByMail,
    fields: mail.fields,
    fieldValidations: mail.fieldValidations,
    additionalFields: getAdditionalMailFieldsFromMeetingStatus(meetings),
    signature: mail.signature,
    clientName: getCurrentMeetingClientName(meetings),
    hasPesel: mail.hasPesel,
    dateOfBirth,
    productGuid,
  };
};

const mapDispatchToProps = {
  onShouldSendDocsByMailChange: toggleShouldSendDocsByMail,
  changeEditorField(field: keyof IFields, value: string) {
    return changeEditorField({ field, value });
  },
  changeEditorFieldValidationError(field: keyof IFields, error: string) {
    return changeEditorFieldValidationError({ field, value: error });
  },
  getSignatureIfNeeded,
  updateFirstNameInDb,
  refetchCurrentMeetingIfNeeded,
  setHasPesel,
  getCalculationValues(productGuid: number, index: number) {
    return getCalculationValues({ productGuid, index });
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
