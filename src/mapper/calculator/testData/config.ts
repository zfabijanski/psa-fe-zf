import {
  ICoversConfigMap,
  IProductCoversMap,
} from "../../../features/Calculator/types";
import { Frequency, IProductsConfigMap } from "../../../models/common";

export const productCoversMap: IProductCoversMap = {
  6101001: {
    mainCover: "LIFECOV",
    additionalCovers: ["ACCDEATH", "PHRA"],
    wopCovers: ["WOPTPD", "WOPSIL"],
    childCovers: ["TPDISCH", "HRC"],
  },
};

export const coversConfigMap: ICoversConfigMap = {
  LIFECOV: {
    coverName: "",
    isHospital: false,
    isChild: false,
  },
  ACCDEATH: {
    coverName: "",
    isHospital: false,
    isChild: false,
  },
  PHRA: {
    coverName: "",
    isHospital: true,
    isChild: false,
  },
  WOPTPD: {
    coverName: "",
    isHospital: false,
    isChild: false,
  },
  WOPSIL: {
    coverName: "",
    isHospital: false,
    isChild: false,
  },
  TPDISCH: {
    coverName: "",
    isHospital: false,
    isChild: false,
  },
  HRC: {
    coverName: "",
    isHospital: true,
    isChild: true,
  },
};

export const productsConfigMap: IProductsConfigMap = {
  6101001: {
    product_freqs: [
      Frequency.Monthly,
      Frequency.Annually,
      Frequency.SemiAnnually,
      Frequency.Quarterly,
    ],
    product_categories: [],
    product_covers: [],
    product_name: "Komfort Życia",
    product_funds: [],
  },
};
