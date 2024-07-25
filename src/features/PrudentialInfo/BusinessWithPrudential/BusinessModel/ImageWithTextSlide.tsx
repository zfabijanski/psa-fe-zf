import React, { FC } from "react";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import ImageWithTextContainer from "../../commons/ImageWithTextContainer";
import ViewContainer from "../../commons/ViewContainer";

interface IProps {
  image: string;
  title: string;
}

const content = [
  {
    label:
      "businessWithPrudential.businessModel.prudentialStructure.seniorDirector",
  },
  {
    label: "businessWithPrudential.businessModel.prudentialStructure.director",
  },
  { label: "businessWithPrudential.businessModel.prudentialStructure.manager" },
  {
    label:
      "businessWithPrudential.businessModel.prudentialStructure.consultant",
  },
];

const ImageWithText: FC<IProps> = ({ image, title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <ImageWithTextContainer image={image} content={content} />
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default ImageWithText;
