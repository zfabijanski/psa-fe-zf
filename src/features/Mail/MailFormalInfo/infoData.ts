import { MessageDescriptor } from "react-intl";

interface IInfoData {
  header: MessageDescriptor;
  subheader: MessageDescriptor;
  list: MessageDescriptor[];
}

const infoHeader = { id: "messageInformationFormal.label.onlineDocsTransfer" };
const infoSubHeader = {
  id: "messageInformationFormal.label.formalInformation",
};
const infoText1 = {
  id: "messageInformationFormal.content.text1",
};
const infoText2 = {
  id: "messageInformationFormal.content.text2",
};
const infoText3 = {
  id: "messageInformationFormal.content.text3",
};

export const infoData: IInfoData = {
  header: infoHeader,
  subheader: infoSubHeader,
  list: [infoText1, infoText2, infoText3],
};
