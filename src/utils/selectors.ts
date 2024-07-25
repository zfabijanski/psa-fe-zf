import { createSelector } from "@reduxjs/toolkit";
import {
  ICoversConfigMap,
  IProductCovers,
  IProductCoversMap,
} from "../features/Calculator/types";
import { IProductsConfigMap } from "../models/common";
import { CoverCategory, ICoverConfig } from "slices/coversConfig";
import { RootState } from "../AppStore";

const getIllustrations = (state: RootState) => state.illustrations.items;
const getProducts = (state: RootState) => state.products.items;
const getCoversConfig = (state: RootState) => state.coversConfig.items;
const getProductsConfig = (state: RootState) => state.productsConfig.items;
export const getFundRiskProfilesConfig = (state: RootState) =>
  state.fundRiskProfilesConfig.items;
export const getCurrentProductGuid = (state: RootState) =>
  state.calculator.current.productGuid;
export const getCurrentIndex = (state: RootState) =>
  state.calculator.current.index;

export const getProductsWithIllustrations = createSelector(
  [getProducts, getIllustrations],
  (productFromStore, illustrationsFromStore) => {
    const getIllustrationsByProductGuid = (productGuid: number) =>
      illustrationsFromStore.filter(
        (item) => item.product_guid === productGuid
      );

    return productFromStore.map((item) => ({
      ...item,
      illustrations: getIllustrationsByProductGuid(item.product_guid),
    }));
  }
);

export const getProductsConfigMap = createSelector(
  [getProductsConfig],
  (productsConfig) => {
    const productsConfigMap: IProductsConfigMap = {};
    return productsConfig.reduce((acc, cur) => {
      acc[cur.product_guid] = {
        ...cur,
      };
      return acc;
    }, productsConfigMap);
  }
);

export const getCurrentProductConfig = createSelector(
  [getProductsConfigMap, getCurrentProductGuid],
  (productsConfigMap, productGuid) => {
    return productsConfigMap[productGuid];
  }
);

export const getCoversPerProductMap = createSelector(
  [getCoversConfig, getProductsConfig],
  (coversConfig, productsConfig) => {
    const getCoversCodeByCategory = (
      coversConfigPerProduct: ICoverConfig[],
      category: CoverCategory
    ) =>
      coversConfigPerProduct
        .filter(
          (coverConfig) =>
            coverConfig && coverConfig.cover_categories.includes(category)
        )
        .map((coverConfig) => coverConfig.cover_code);

    const coversPerProductMap: IProductCoversMap = {};

    return productsConfig.reduce((acc, cur) => {
      const coversConfigPerProduct = Array.from(cur.product_covers)
        .sort((a, b) => Number(a.cover_order) - Number(b.cover_order))
        .map(
          (productCover) =>
            coversConfig.find(
              (coverConfig) =>
                coverConfig.cover_code === productCover.cover_code
            )!
        );
      acc[cur.product_guid] = {
        mainCover: getCoversCodeByCategory(
          coversConfigPerProduct,
          CoverCategory.Main
        )[0],
        additionalCovers: getCoversCodeByCategory(
          coversConfigPerProduct,
          CoverCategory.Additional
        ),
        wopCovers: getCoversCodeByCategory(
          coversConfigPerProduct,
          CoverCategory.WOP
        ),
        childCovers: getCoversCodeByCategory(
          coversConfigPerProduct,
          CoverCategory.Child
        ),
      };
      return acc;
    }, coversPerProductMap);
  }
);

export const getCoversForCurrentProduct = createSelector(
  [getCoversPerProductMap, getCurrentProductGuid],
  (coversConfigPerProductMap, productGuid): IProductCovers => {
    return coversConfigPerProductMap[productGuid];
  }
);

export const getIllustrationIdsForCurrentProduct = createSelector(
  [getIllustrations, getCurrentProductGuid],
  (illustrations, productGuid) => {
    return illustrations
      .filter((illustration) => illustration.product_guid === productGuid)
      .map((illustration) => illustration.pru_calc_calculation_id);
  }
);

export const getCurrentIllustrationId = createSelector(
  [getIllustrationIdsForCurrentProduct, getCurrentIndex],
  (illustrationIds, index) => {
    return illustrationIds[index];
  }
);

export const getCoversConfigMap = createSelector(
  [getCoversConfig],
  (coversConfig) => {
    const coversConfigMap: ICoversConfigMap = {};
    return coversConfig.reduce((acc, cur) => {
      acc[cur.cover_code] = {
        coverName: cur.cover_name,
        isChild: cur.cover_categories.includes(CoverCategory.Child),
        isHospital: cur.cover_categories.includes(CoverCategory.Hospital),
      };
      return acc;
    }, coversConfigMap);
  }
);
