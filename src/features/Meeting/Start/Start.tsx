import { useLayoutEffect, useState } from "react";
import Form from "../../../components/Form";
import UserCard from "../../../components/UserCard";
import PageLayout from "../../../layouts/PageLayout";
import { showModal } from "slices/modal";
import { useAppDispatch } from "../../../AppStore";
import { capitalizeFirst } from "../../../utils/formatters";
import { RoutePath, redirect } from "../../../utils/router";
import { isFirstNameValid } from "../../../utils/validationRules";
import ClientNameInput from "./ClientNameInput";

interface IProps {
  validateAndAddMeeting: (clientName: string, redirectTo: RoutePath) => void;
  isFullscreenSpinnerRequested: boolean;
  getMeetingsCountsAndWarnIfNeeded: () => void;
}

const Start = (props: IProps) => {
  useLayoutEffect(() => {
    props.getMeetingsCountsAndWarnIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useAppDispatch();

  const [clientName, setClientName] = useState("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const modalConfig: Parameters<typeof showModal>[0] = {
    modalContentTrKey: "startNewMeeting.error.lettersOnly",
    modalButtons: {
      confirm: {
        textTrKey: "modal.ok",
        onClick: () => setIsConfirmModalVisible(false),
      },
    },
  };

  const handleClientNameChange = (value: string) => {
    if (value.length <= 64) {
      setClientName(value);
    }
  };

  const handleClientNameBlur = (value: string) => {
    const valueTrimmed = value.trim();
    setClientName(capitalizeFirst(valueTrimmed));
    const isValueValid = !valueTrimmed.length || isFirstNameValid(valueTrimmed);

    if (!isValueValid) {
      dispatch(showModal(modalConfig));
      setIsConfirmModalVisible(true);
    }
  };

  const handleSubmit = (navigateTo?: RoutePath) => {
    const capitalizedClientName = capitalizeFirst(clientName);
    setClientName(capitalizedClientName);
    props.validateAndAddMeeting(
      capitalizedClientName,
      navigateTo || "/meeting"
    );
  };

  const handleApkClick = () => handleSubmit("/apk");
  const handleIddClick = () => handleSubmit("/adequacy-idd");

  const buttonsDisabled =
    props.isFullscreenSpinnerRequested || clientName.trim() === "";

  return (
    <Form onSubmit={handleSubmit}>
      <PageLayout
        pageName="startNewMeeting.label.pageName"
        footer={{
          leftSection: [
            { config: "prevButtonConfig", onClick: () => redirect("/") },
          ],
          rightSection: [
            {
              config: "iddButtonConfig",
              onClick: handleIddClick,
              disabled: buttonsDisabled,
            },
            {
              config: "apkButtonConfig",
              onClick: handleApkClick,
              disabled: buttonsDisabled,
            },
            {
              config: "getArrowNextConfig",
              message: "bottomButtonBar.next",
              disabled: buttonsDisabled,
              htmlType: "submit",
            },
          ],
        }}
      >
        <UserCard />
        <ClientNameInput
          value={clientName}
          shouldFocus={!isConfirmModalVisible}
          onChange={handleClientNameChange}
          onBlur={handleClientNameBlur}
        />
      </PageLayout>
    </Form>
  );
};

export default Start;
