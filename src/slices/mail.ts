import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOutSuccess } from "./auth";

export interface IAttachment {
  id: number;
  name: string;
  isRemovable: boolean;
  isStateChanging: boolean;
}

export interface ISignature {
  companyName: string;
  email: string;
  name: string;
  pageURL: string;
  phoneNumber: string;
  position: string;
  surname: string;
  text1: string;
  text2: string;
}

export interface IFields {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  phone: string;
  pesel: string;
  passport: string;
  birthdate: string;
  content: string;
}

export type AdditionalField =
  | "lastName"
  | "phone"
  | "pesel"
  | "birthdate"
  | "passport";

export enum MailStatus {
  FormalInfoNotAccepted = "FormalInfoNotAccepted",
  Editing = "Editing",
  Sending = "Sending",
  SentSuccess = "SentSuccess",
  SentFailure = "SentFailure",
}

type State = {
  attachments: IAttachment[];
  signature?: ISignature;
  shouldSendDocsByMail: boolean;
  errorMessage: string;
  status: MailStatus;
  fieldValidations: IFields;
  fields: IFields;
  hasPesel: boolean;
};

const initialState: State = {
  attachments: [],
  shouldSendDocsByMail: false,
  hasPesel: true,
  errorMessage: "",
  status: MailStatus.FormalInfoNotAccepted,
  fieldValidations: {
    pesel: "",
    lastName: "",
    firstName: "",
    content: "",
    email: "",
    phone: "",
    birthdate: "",
    passport: "",
    subject: "",
  },
  fields: {
    pesel: "",
    lastName: "",
    firstName: "",
    content: "",
    email: "",
    phone: "",
    birthdate: "",
    passport: "",
    subject: "Podsumowanie spotkania",
  },
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    changeEditorField(
      state,
      action: PayloadAction<{ field: keyof IFields; value: string }>
    ) {
      state.fields[action.payload.field] = action.payload.value;
    },
    changeEditorFieldValidationError(
      state,
      action: PayloadAction<{ field: keyof IFields; value: string }>
    ) {
      state.fieldValidations[action.payload.field] = action.payload.value;
    },
    editMail(state) {
      state.status = MailStatus.Editing;
    },
    getAttachmentsSuccess(state, action: PayloadAction<IAttachment[]>) {
      state.attachments = action.payload;
    },
    getSignatureSuccess(state, action: PayloadAction<ISignature>) {
      state.signature = action.payload;
    },
    mailSendFailure(state) {
      state.status = MailStatus.SentFailure;
    },
    mailSendSuccess(state) {
      state.status = MailStatus.SentSuccess;
    },
    removeAttachmentFailure(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    removeAttachmentRequest(state, action: PayloadAction<number>) {
      state.attachments = state.attachments.map((attachment) => {
        if (attachment.id === action.payload) {
          attachment.isStateChanging = true;
        }
        return attachment;
      });
    },
    removeAttachmentSuccess(state, action: PayloadAction<number>) {
      state.attachments = state.attachments.filter(
        (attachment) => attachment.id !== action.payload
      );
    },
    requestMailSend(state) {
      state.status = MailStatus.Sending;
    },
    resetMail(state) {
      Object.keys(initialState).forEach((key) => {
        // We have to mutate each key separately, because immer doesn't support
        // resetting state to initialState
        // https://redux-toolkit.js.org/usage/immer-reducers#resetting-and-replacing-state
        // @ts-ignore TS doesn't know that key is a valid key of State
        state[key] = initialState[key];
      });
    },
    setFieldsValidationErrors(
      state,
      action: PayloadAction<Partial<Record<keyof IFields, string>>>
    ) {
      state.fieldValidations = {
        ...state.fieldValidations,
        ...action.payload,
      };
    },
    setHasPesel(state, action: PayloadAction<boolean>) {
      state.hasPesel = action.payload;
    },
    toggleShouldSendDocsByMail(state) {
      state.shouldSendDocsByMail = !state.shouldSendDocsByMail;
    },
  },
  extraReducers(builder) {
    builder.addCase(signOutSuccess, () => initialState);
  },
});

export const {
  changeEditorField,
  changeEditorFieldValidationError,
  editMail,
  getAttachmentsSuccess,
  getSignatureSuccess,
  mailSendFailure,
  mailSendSuccess,
  removeAttachmentFailure,
  removeAttachmentRequest,
  removeAttachmentSuccess,
  requestMailSend,
  resetMail,
  setFieldsValidationErrors,
  setHasPesel,
  toggleShouldSendDocsByMail,
} = mailSlice.actions;

export * from "./mail.thunks";
