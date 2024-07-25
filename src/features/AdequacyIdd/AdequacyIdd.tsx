import React from "react";
import FormalInfo from "../FormalInfo/FormalInfo";
import { infoData } from "./infoData";

interface IProps {
  onQuestionnaireStart: () => void;
}

const Adequacy = (props: IProps) => {
  const acceptFormalInfo = () => props.onQuestionnaireStart();

  return (
    <>
      <FormalInfo
        acceptFormalInfo={acceptFormalInfo}
        infoData={infoData.content.formalInfo}
        pageName={infoData.content.formalInfo.header.id}
      />
    </>
  );
};

export default Adequacy;
