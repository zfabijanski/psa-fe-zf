import FormalInfo from "../../FormalInfo/FormalInfo";
import { infoData } from "./infoData";

interface IProps {
  acceptFormalInfo: () => void;
}

const MailFormalInfo = (props: IProps) => (
  <FormalInfo
    acceptFormalInfo={props.acceptFormalInfo}
    pageName="messageInformationFormal.title"
    infoData={infoData}
  />
);

export default MailFormalInfo;
