import { FormikActions, FormikState } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Frequency, ProductCategory } from "../../../models/common";
import { YesNo } from "models/calculator";
import { ProductGuid } from "../../Products/types";
import AdditionalAgreement from "../AdditionalAgreement";
import AdditionalAgreementFill from "../AdditionalAgreementFill";
import { AllocationSection } from "../AllocationSection";
import ChildrenSection from "../ChildrenSection";
import ChildSection from "../ChildSection";
import { Separator } from "../ChildSection/componets/Separator";
import { IErrorMessageResolver } from "../errorMessageResolver";
import MainCover from "../MainCover";
import MainCoverExtension from "../MainCoverExtension";
import PremiumSummary from "../PremiumSummary";
import { ICalculationVM } from "../types";
import { CoversSectionWrapper } from "./CoversSectionWrapper";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<ICalculationVM>, "errors" | "values"> {
  productName: string;
  productCategories: ProductCategory[];
  calculated?: boolean;
  resolveErrorMessage: IErrorMessageResolver;
}

const showSummaryPredicate = (categories: ProductCategory[]) =>
  !(
    categories.includes(ProductCategory.Investment) ||
    categories.includes(ProductCategory.Funds)
  );

export const CoversPanel: React.FC<IProps> = ({
  productName,
  productCategories,
  values,
  errors,
  resolveErrorMessage,
  calculated,
  setFieldValue,
}) => (
  <>
    <MainCover
      productName={productName}
      productCategories={productCategories}
      values={values.mainCover}
      errors={errors.mainCover || {}}
      resolveErrorMessage={resolveErrorMessage}
      setFieldValue={setFieldValue}
      name={"mainCover"}
      frequencyCode={values.frequencyCode}
    />
    <div>
      <CoversSectionWrapper
        shouldRender={
          productCategories.includes(ProductCategory.Investment) ||
          productCategories.includes(ProductCategory.Funds)
        }
      >
        <MainCoverExtension values={values} />
      </CoversSectionWrapper>
      <CoversSectionWrapper
        shouldRender={
          !!(values.additionalCovers && values.additionalCovers.length > 0)
        }
      >
        <AdditionalAgreement
          values={values.additionalCovers}
          errors={errors.additionalCovers || []}
          resolveErrorMessage={resolveErrorMessage}
          setFieldValue={setFieldValue}
          title={{ id: "calculator.additionalContracts" }}
          name={"additionalCovers"}
          monthsEnabled={productCategories.includes(ProductCategory.Protective)}
          mainCoverDuration={values.mainCover.duration}
          frequencyCode={values.frequencyCode}
        />
      </CoversSectionWrapper>
      <CoversSectionWrapper
        shouldRender={
          !!(values.wopCovers && values.wopCovers.length > 0) &&
          (values.policyHolderIsMainInsured === YesNo.Yes ||
            productCategories.includes(ProductCategory.Child))
        }
      >
        <AdditionalAgreementFill
          values={values.wopCovers || []}
          errors={errors.wopCovers || []}
          setFieldValue={setFieldValue}
          resolveErrorMessage={resolveErrorMessage}
          name={"wopCovers"}
        />
      </CoversSectionWrapper>
      <CoversSectionWrapper
        shouldRender={productCategories.includes(ProductCategory.Protective)}
      >
        <ChildrenSection
          values={values.additionalLifeAssureds || []}
          errors={errors.additionalLifeAssureds || []}
          resolveErrorMessage={resolveErrorMessage}
          setFieldValue={setFieldValue}
          name={"additionalLifeAssureds"}
          mainCoverDuration={values.mainCover.duration}
          frequencyCode={values.frequencyCode}
        />
      </CoversSectionWrapper>
      <CoversSectionWrapper
        shouldRender={productCategories.includes(ProductCategory.Child)}
      >
        <Separator />
        <ChildSection
          values={values.mainInsured}
          errors={errors.mainInsured || {}}
          resolveErrorMessage={resolveErrorMessage}
          name={"mainInsured"}
          title={<FormattedMessage id="calculator.childSectionTitle" />}
          setFieldValue={setFieldValue}
          deathBenefitVisible={true}
          deathBenefit={values.mainCover.addSumAssured}
          deathBenefitError={(errors.mainCover || {}).addSumAssured}
          mainCoverCode={values.mainCover.code}
          mainCoverDuration={values.mainCover.duration}
          frequencyCode={values.frequencyCode}
        />
      </CoversSectionWrapper>
      <CoversSectionWrapper
        shouldRender={values.productGuid === ProductGuid.Oxygen}
      >
        <AllocationSection
          values={values.fundContributions}
          errors={errors.fundContributions || []}
          name="fundContributions"
          setFieldValue={setFieldValue}
        />
      </CoversSectionWrapper>
    </div>
    {showSummaryPredicate(productCategories) && (
      <PremiumSummary
        premiumsTotal={values.premiumsTotal}
        frequency={values.frequencyCode || Frequency.Monthly}
      />
    )}
  </>
);
