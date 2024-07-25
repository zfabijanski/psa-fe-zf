import React, { FC } from "react";
import OverrideSchemeImage from "../../../../assets/images/override-scheme.svg";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import ImageWithCaption from "../../commons/ImageWithCaption";
import { ITextColumnContent } from "../../commons/types";
import ViewContainer from "../../commons/ViewContainer";

interface IProps {
  title: string;
}

const content: ITextColumnContent[] = [
  {
    label: "commissionSystem.override.seniorDirector.label",
  },
  {
    label: "commissionSystem.override.director.label",
  },
  {
    label: "commissionSystem.override.manager.label",
  },
  {
    label: "commissionSystem.override.consultant.label",
  },
];

const Override: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <ImageWithCaption
          content={content}
          image={OverrideSchemeImage}
          hint={"commissionSystem.override.bottomText"}
          boldLabels={true}
        />
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default Override;
