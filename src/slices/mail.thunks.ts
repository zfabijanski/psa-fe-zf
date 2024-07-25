import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "AppStore";
import { Brand, authApi } from "./auth";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import {
  AdditionalField,
  IAttachment,
  IFields,
  ISignature,
  editMail,
  getAttachmentsSuccess,
  getSignatureSuccess,
  mailSendFailure,
  removeAttachmentRequest,
  removeAttachmentSuccess,
  requestMailSend,
  setFieldsValidationErrors,
} from "./mail";
import { ApiError, SystemError, api } from "utils/api";
import { mapAgentPositionToPositionName } from "mapper/agent/agent";
import { showModal } from "slices/modal";
import { newErrorModal } from "utils/confirmModalFactory";
import { toggleDocumentStateSuccess } from "./library";
import { formatDateSafe, mainDateDisplayFormat } from "utils/dateUtils";
import { getAdditionalMailFieldsFromMeetingStatus } from "slices/meetings";
import { redirect } from "utils/router";

interface IMailSendRequest {
  p_client_name: string;
  p_email_address: string | null;
  p_last_name: string;
  p_mail_text: string;
  p_mail_subject: string;
  p_phone_number: string;
  p_pesel: string;
  p_birthdate: string;
  p_passport: string;
}

interface IMailAttachmentResponse {
  brand: string;
  crc: string;
  create_date: string;
  doc_id: number;
  document_id: number;
  document_type_id: number;
  document_type_name: string;
  dr_id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  id: number;
  guid: string;
  is_active: number;
  link: string;
  meeting_document_id: number;
  meeting_document_status: number;
  meeting_document_status_name: string;
  meeting_id: number;
  meetings_mails_id: number;
  name: string;
  owu: string;
  parent_doc_id: number;
  partner_id: number;
  profile_name: string;
  rop_available: string;
  status_id: number;
  status_name: string;
  update_date: string;
  version: number;
}

export const getEmptyStandardFields = (
  fields: IFields,
  additionalFields: AdditionalField[],
  shouldSendDocsByMail: boolean
) => {
  let allFields: Partial<IFields> = {
    firstName: fields.firstName,
  };

  if (shouldSendDocsByMail) {
    allFields = { ...allFields, email: fields.email };
  }

  additionalFields.forEach((additionalField) => {
    if (additionalField !== "phone") {
      allFields = { ...allFields, [additionalField]: fields[additionalField] };
    } else if (additionalField === "phone" && shouldSendDocsByMail) {
      allFields = { ...allFields, [additionalField]: fields[additionalField] };
    }
  });

  const isValueEmpty = (value?: string) => value?.trim() === "";
  return Object.entries(allFields)
    .filter(([, value]) => isValueEmpty(value))
    .map(([key]) => key as keyof IFields);
};

export const transformMail = (fields: IFields): IMailSendRequest => ({
  p_client_name: fields.firstName,
  p_email_address: fields.email.length ? fields.email : null,
  p_last_name: fields.lastName,
  p_mail_subject: fields.subject,
  p_mail_text: fields.content,
  p_phone_number: fields.phone && `48${fields.phone}`,
  p_pesel: fields.pesel,
  p_birthdate:
    fields.birthdate && formatDateSafe(fields.birthdate, mainDateDisplayFormat),
  p_passport: fields.passport,
});

export const transformAttachments = (
  attachmentsResponse: IMailAttachmentResponse[]
): IAttachment[] =>
  attachmentsResponse.map((response) => ({
    name: response.name,
    id: response.id,
    isStateChanging: false,
    isRemovable: response.meeting_document_status_name !== "ADDED_PERMANENTLY",
  }));

export const getSignatureIfNeeded = createAsyncThunk(
  "mail/getSignatureIfNeeded",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (state.mail.signature) {
      return;
    }

    const brand =
      (await dispatch(authApi.endpoints.getAgent.initiate()))?.data?.brand ??
      Brand.BrandPP;

    dispatch(showFullscreenSpinner());
    api
      .get<ISignature>("api/footer")
      .then((signature) => ({
        ...signature,
        position: mapAgentPositionToPositionName(brand, signature.position),
      }))
      .then((signature) => {
        dispatch(getSignatureSuccess(signature));
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      })
      .finally(() => {
        dispatch(hideFullscreenSpinner());
      });
  }
);

export const removeDocument = createAsyncThunk(
  "mail/removeDocument",
  async (documentId: number, { dispatch }) => {
    dispatch(showFullscreenSpinner());
    dispatch(removeAttachmentRequest(documentId));
    api
      .delete(`/api/library/documents/${documentId}`)
      .then(() => {
        dispatch(removeAttachmentSuccess(documentId));
        dispatch(toggleDocumentStateSuccess(documentId));
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      })
      .finally(() => dispatch(hideFullscreenSpinner()));
  }
);

export const getAttachments = createAsyncThunk(
  "mail/getAttachments",
  async (_, { dispatch }) => {
    dispatch(showFullscreenSpinner());
    api
      .get<IMailAttachmentResponse[]>("api/mails/documents")
      .then(transformAttachments)
      .then((attachments) => {
        dispatch(getAttachmentsSuccess(attachments));
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      })
      .finally(() => {
        dispatch(hideFullscreenSpinner());
      });
  }
);

export const validateAndSendMail = createAsyncThunk(
  "mail/validateAndSendMail",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const additionalFields = getAdditionalMailFieldsFromMeetingStatus(
      state.meetings
    );
    const { fields, shouldSendDocsByMail, hasPesel, fieldValidations } =
      state.mail;

    const contentEmptyError =
      fields.content?.trim() === "" ? "mail.error.noContent" : undefined;
    const subjectEmptyError =
      fields.subject?.trim() === "" ? "mail.error.incorrectSubject" : undefined;

    const fieldError = Object.values({
      ...fieldValidations,
      contentEmptyError,
      subjectEmptyError,
    }).filter(Boolean)[0];

    const additionalFieldsToCheck = additionalFields.filter((field) => {
      return hasPesel
        ? field !== "passport" && field !== "birthdate"
        : field !== "pesel";
    });

    const emptyStandardFields = getEmptyStandardFields(
      fields,
      additionalFieldsToCheck,
      shouldSendDocsByMail
    );

    const emptyFieldsErrors: Partial<Record<keyof IFields, string>> = [
      ...emptyStandardFields,
    ].reduce(
      (acc, curr) => ({ ...acc, [curr]: "mail.error.mandatoryField" }),
      {}
    );

    dispatch(
      setFieldsValidationErrors({
        ...emptyFieldsErrors,
        subject: subjectEmptyError,
        content: contentEmptyError,
      })
    );

    if (emptyStandardFields.length) {
      // TODO: apply deny styling?
      dispatch(showModal({ modalContentTrKey: "mail.error.mandatoryFields" }));
    } else if (fieldError) {
      dispatch(showModal({ modalContentTrKey: fieldError }));
    } else if (!shouldSendDocsByMail) {
      dispatch(
        showModal({
          modalContentTrKey: "mail.warning.consultantOnly",
          modalButtons: {
            cancel: { textTrKey: "confirmWindow.back" },
            confirm: {
              // TODO: apply deny styling?
              textTrKey: "confirmWindow.yes",
              onClick: () => dispatch(sendMail()),
            },
          },
        })
      );
    } else {
      dispatch(sendMail());
    }
  }
);

const sendMail = createAsyncThunk(
  "mail/sendMail",
  async (_, { getState, dispatch }) => {
    dispatch(requestMailSend());
    const state = getState() as RootState;
    const body = transformMail(state.mail.fields);
    if (!navigator.onLine) {
      dispatch(mailSendFailure());
      dispatch(
        showModal({
          modalContentTrKey: "mail.error.noConnection",
          modalButtons: {
            confirm: {
              textTrKey: "modal.ok",
              onClick: () => dispatch(editMail()),
            },
          },
        })
      );
      return;
    }

    dispatch(showFullscreenSpinner());

    return api
      .post("api/mails/send", body)
      .then(() => {
        dispatch(
          showModal({
            modalContentTrKey: "mail.info.messageSavedOnServer",
            modalButtons: {
              confirm: {
                textTrKey: "mail.info.modal.confirmButton",
                onClick: () => redirect("/"),
              },
              cancel: {
                textTrKey: "mail.info.modal.cancelButton",
                onClick: () => redirect("/meeting"),
              },
            },
          })
        );
      })
      .catch((error) => {
        if (
          error instanceof ApiError ||
          (error instanceof SystemError && !error.response)
        ) {
          dispatch(mailSendFailure());
          dispatch(
            showModal({
              modalContentTrKey: "mail.error.messageNotSavedOnServer",
              modalButtons: {
                cancel: {
                  textTrKey: "confirmWindow.back",
                  onClick: () => dispatch(editMail()),
                },
                confirm: {
                  textTrKey: "confirmWindow.retry",
                  onClick: () => dispatch(sendMail()),
                },
              },
            })
          );
        }
      })
      .finally(() => {
        dispatch(hideFullscreenSpinner());
      });
  }
);

export const updateFirstNameInDb = createAsyncThunk(
  "mail/updateFirstNameInDb",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    return api
      .patch("api/meetings/", {
        p_name: state.mail.fields.firstName,
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      });
  }
);
