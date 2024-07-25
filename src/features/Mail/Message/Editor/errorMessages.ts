import { MessageDescriptor } from "react-intl";
import { IFields } from "../../types";

const errorIncorrectPhoneNumber = "mail.error.incorrectPhoneNumber";
const errorIncorrectEmail = "mail.error.incorrectEmail";
const errorIncorrectPESEL = "mail.error.incorrectPESEL";
const errorIncorrectDataFormat = "mail.error.incorrectDataFormat";
const errorIncorrectPassport = "mail.error.incorrectPassport";
const errorIncorrectBirthdate = "mail.error.incorrectBirthdate";
const errorIncorrectTitleMaxLength = "mail.error.titleMaxLength";
const errorIncorrectContentMaxLength = "mail.error.contentMaxLength";

export const errorMessages: { [K in keyof IFields]: MessageDescriptor } = {
  firstName: { id: errorIncorrectDataFormat },
  lastName: { id: errorIncorrectDataFormat },
  pesel: { id: errorIncorrectPESEL },
  email: { id: errorIncorrectEmail },
  phone: { id: errorIncorrectPhoneNumber },
  subject: { id: errorIncorrectTitleMaxLength },
  content: { id: errorIncorrectContentMaxLength },
  passport: { id: errorIncorrectPassport },
  birthdate: { id: errorIncorrectBirthdate },
};

export const errorMandatoryFieldMessage = "mail.error.mandatoryField";
