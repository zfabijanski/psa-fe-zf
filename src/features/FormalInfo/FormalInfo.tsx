import { MessageDescriptor } from "react-intl";
import PageLayout from "../../layouts/PageLayout";
import { goBack } from "../../utils/router";
import FormalInfoContent, {
  IFormalInfoContentProps,
} from "./FormalInfoContent";

export interface IFormalInfoContainerProps {
  acceptFormalInfo: () => void;
  pageName: MessageDescriptor["id"];
  infoData: IFormalInfoContentProps;
}

const FormalInfo = (props: IFormalInfoContainerProps) => {
  const handlePrevClick = () => goBack();

  return (
    <PageLayout
      footer={{
        leftSection: [{ config: "prevButtonConfig", onClick: handlePrevClick }],
        rightSection: [
          {
            config: "getArrowNextConfig",
            message: "bottomButtonBar.next",
            onClick: props.acceptFormalInfo,
          },
        ],
      }}
      pageName={props.pageName}
    >
      <FormalInfoContent {...props.infoData} />
    </PageLayout>
  );
};

export default FormalInfo;
