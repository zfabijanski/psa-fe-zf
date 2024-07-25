import { IBusinessWithPrudentialButton } from "./types";

import { StartSlide } from "slices/businessWithPrudential";
export const buttons: IBusinessWithPrudentialButton[] = [
  {
    label: "businessWithPrudential.start.aboutPrudential.label",
    icon: "pru-logo",
    startSlidesFrom: StartSlide.BasicInfo,
    hoverPathKey: "fill",
  },
  {
    label: "businessWithPrudential.start.businessModel.label",
    icon: "people",
    startSlidesFrom: StartSlide.ConsultantWorkModel,
  },
  {
    label: "businessWithPrudential.start.products.label",
    icon: "products",
    startSlidesFrom: StartSlide.PrudentialProducts,
  },
  {
    label: "businessWithPrudential.start.commissionSystem.label",
    icon: "commission-system",
    startSlidesFrom: StartSlide.CommissionSystem,
  },
  {
    label: "businessWithPrudential.start.electronicApplication.label",
    icon: "electronic-application",
    startSlidesFrom: StartSlide.EApp,
  },
];
