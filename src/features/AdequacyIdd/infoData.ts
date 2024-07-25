import { MessageDescriptor } from "react-intl";

interface IInfoData {
  content: {
    formalInfo: {
      header: MessageDescriptor;
      subheader: MessageDescriptor;
      list: MessageDescriptor[];
    };
  };
}

const headerIDD: MessageDescriptor = {
  id: "adequacyIdd.formalInfo.title",
};
const labelFormalInfo: MessageDescriptor = {
  id: "messageInformationFormal.label.formalInformation",
};
const info1: MessageDescriptor = {
  id: "adequacyIdd.formalInfo.text1",
};
const info2: MessageDescriptor = {
  id: "adequacyIdd.formalInfo.text2",
};
const info3: MessageDescriptor = {
  id: "adequacyIdd.formalInfo.text3",
};
const info4: MessageDescriptor = {
  id: "adequacyIdd.formalInfo.text4",
};

export const infoData: IInfoData = {
  content: {
    formalInfo: {
      header: headerIDD,
      subheader: labelFormalInfo,
      list: [info1, info2, info3, info4],
    },
  },
};
