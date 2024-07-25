import React, { FC } from "react";
import PrudentialStructureImage from "../../../../assets/images/prudential-structure.svg";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import ImageWithCaption from "../../commons/ImageWithCaption";
import { ITextColumnContent } from "../../commons/types";
import ViewContainer from "../../commons/ViewContainer";

interface IProps {
  title: string;
}

const content: ITextColumnContent[] = [
  {
    label: "commissionSystem.expectedIncome.seniorDirector.label",
    description: "commissionSystem.expectedIncome.seniorDirector.text",
  },
  {
    label: "commissionSystem.expectedIncome.director.label",
    description: "commissionSystem.expectedIncome.director.text",
  },
  {
    label: "commissionSystem.expectedIncome.manager.label",
    description: "commissionSystem.expectedIncome.manager.text",
  },
  {
    label: "commissionSystem.expectedIncome.consultant.label",
    description: "commissionSystem.expectedIncome.consultant.text",
  },
];

const ExpectedIncome: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <ImageWithCaption
          content={content}
          image={PrudentialStructureImage}
          hint={"commissionSystem.expectedIncome.bottomText"}
          boldLabels={true}
          hasDescription={true}
        />
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default ExpectedIncome;
