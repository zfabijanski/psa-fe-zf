import React from "react";
import { ISlideData } from "../../commons/types";
import SingleImage from "./SingleImage";

import BusinessModelStructureImage from "../../../../assets/images/business-model-structure.svg";
import ConsultantWorkModelImage from "../../../../assets/images/consultant-work-model.svg";
import PrudentialStructureImage from "../../../../assets/images/prudential-structure.svg";
import ImageWithTextSlide from "./ImageWithTextSlide";

export const businessModelSlides: ISlideData[] = [
  {
    id: "ConsultantWorkModel",
    pageLabel: "businessWithPrudential.start.businessModel.label",
    component: () => (
      <SingleImage
        title={"businessWithPrudential.businessModel.consultantWorkModel.title"}
        image={ConsultantWorkModelImage}
      />
    ),
  },
  {
    id: "BusinessModelStructure",
    pageLabel: "businessWithPrudential.start.businessModel.label",
    component: () => (
      <SingleImage
        title={"businessWithPrudential.businessModel.businessModel.title"}
        image={BusinessModelStructureImage}
      />
    ),
  },
  {
    id: "PrudentialStructure",
    pageLabel: "businessWithPrudential.start.businessModel.label",
    component: () => (
      <ImageWithTextSlide
        title={"businessWithPrudential.businessModel.prudentialStructure.title"}
        image={PrudentialStructureImage}
      />
    ),
  },
];
