import { get, keyBy, toString } from "lodash";
import moment from "moment";
import {
  ICalculationVM,
  ICover as ICoverVm,
  ICoversConfigMap,
  IFundContribution,
  IInsured as IInsuredVm,
  IProductCoversMap,
} from "../../features/Calculator/types";
import {
  Frequency,
  IFundRiskProfileConfig,
  IProductFund,
  IProductsConfigMap,
  ProductCategory,
  Role,
} from "../../models/common";
import {
  Direction,
  ICalculationDetailsDto,
  ICover as ICoverDto,
  IInsured as IInsuredDto,
  YesNo,
} from "models/calculator";
import { dateFormat } from "../../utils/dateCalculations";
import { roundToDecimals } from "utils/transformers";

const mapDtoToVm = (
  calculationDetailsDto: ICalculationDetailsDto,
  coversConfigMap: ICoversConfigMap,
  productCoversMap?: IProductCoversMap,
  productsConfigMap?: IProductsConfigMap,
  fundRiskProfiles?: IFundRiskProfileConfig[],
  mainCoverDirectionOfCalculation?: Direction
): ICalculationVM => {
  const isChildProduct = calculationDetailsDto.product_categories.includes(
    ProductCategory.Child
  );
  const productCovers =
    productCoversMap && calculationDetailsDto.product_guid
      ? productCoversMap[calculationDetailsDto.product_guid]
      : undefined;
  const productFunds =
    (productsConfigMap &&
      calculationDetailsDto.product_guid &&
      productsConfigMap[calculationDetailsDto.product_guid].product_funds) ||
    [];
  const mainCoverDto = calculationDetailsDto.covers_list.find(
    (cover) => cover.code === (productCovers ? productCovers.mainCover : "")
  );
  const frequencyCode =
    (mainCoverDto && mainCoverDto.frequency_code) ||
    (productsConfigMap &&
      productsConfigMap[calculationDetailsDto.product_guid].product_freqs[0]);

  const mainCoverConfig = productsConfigMap
    ? productsConfigMap[calculationDetailsDto.product_guid].product_covers.find(
        (cover) =>
          cover.cover_code === (productCovers ? productCovers.mainCover : "")
      )
    : undefined;

  const mainCover = mapCoverDtoToVm(
    productCovers ? productCovers.mainCover : "",
    false,
    mainCoverDto,
    false,
    mainCoverDirectionOfCalculation
  );
  const additionalCovers = mapCoversDtoToVm(
    calculationDetailsDto.covers_list,
    productCovers ? productCovers.additionalCovers : [],
    coversConfigMap,
    false
  );
  const wopCovers = mapCoversDtoToVm(
    calculationDetailsDto.covers_list,
    productCovers ? productCovers.wopCovers : [],
    coversConfigMap,
    true
  );

  const mainInsured = {
    ...mapInsuredDtoToVm(
      calculationDetailsDto.insureds_list.find(
        (insured) => insured.role === Role.MAIN || insured.role === Role.MAIN_PH
      )
    ),
    covers: isChildProduct
      ? mapCoversDtoToVm(
          calculationDetailsDto.covers_list,
          productCovers ? productCovers.childCovers : [],
          coversConfigMap,
          false,
          1
        )
      : [],
  };
  const policyHolder = mapInsuredDtoToVm(
    calculationDetailsDto.insureds_list.find(
      (insured) => insured.role === Role.PH || insured.role === Role.ALA_PH
    )
  );
  const additionalLifeAssureds: IInsuredVm[] =
    calculationDetailsDto.insureds_list
      .filter((insured) => insured.role === Role.ALA)
      .map((insured) => ({
        ...mapInsuredDtoToVm(insured),
        covers: mapCoversDtoToVm(
          calculationDetailsDto.covers_list,
          productCovers ? productCovers.childCovers : [],
          coversConfigMap,
          false,
          insured.insured_idx
        ),
      }));

  const fundContributions = mapFundsToVm(
    calculationDetailsDto,
    productFunds,
    fundRiskProfiles
  );

  return {
    calculationId: toValueOrDefault(calculationDetailsDto.calculation_id),
    productGuid: calculationDetailsDto.product_guid,
    productCategories: calculationDetailsDto.product_categories,
    premiumsTotal: toValueOrDefault(calculationDetailsDto.premiums_total),
    guaranteedDeathBenefit: toValueOrDefault(
      calculationDetailsDto.guaranteed_death_benefit
    ),
    guaranteedMaturityBenefit: toValueOrDefault(
      calculationDetailsDto.guaranteed_maturity_benefit
    ),
    projectedMaturityValueEgrM: toValueOrDefault(
      calculationDetailsDto.projected_maturity_value_egr_m
    ),
    policyHolderIsMainInsured: toYesNo(
      calculationDetailsDto.insureds_list.some(
        (insured) => insured.role === Role.MAIN_PH
      )
    ),
    indexation: toValueOrDefault(mainCoverDto ? mainCoverDto.indexation : null),
    ropOption: toValueOrDefault(mainCoverDto ? mainCoverDto.rop_option : null),
    ropAvailable: toValueOrDefault(
      mainCoverConfig ? mainCoverConfig.rop_available : null
    ),
    investmentProfile: toValueOrDefault(
      mainCoverDto ? mainCoverDto.investment_profile : null
    ),
    frequencyCode: frequencyCode as Frequency,
    mainCover,
    additionalCovers,
    wopCovers,
    mainInsured,
    policyHolder,
    additionalLifeAssureds,
    fundContributions,
  };
};

const mapCoversDtoToVm = (
  covers: ICoverDto[],
  coversCode: string[],
  coversConfigMap: ICoversConfigMap,
  isWOP: boolean,
  insuredIndex?: number
): ICoverVm[] => {
  return coversCode.map((coverCode) =>
    mapCoverDtoToVm(
      coverCode,
      isWOP,
      covers.find(
        (cover) =>
          cover.code === coverCode &&
          (!insuredIndex || cover.insured_idx === insuredIndex)
      ),
      coversConfigMap[coverCode].isHospital
    )
  );
};

const mapInsuredDtoToVm = (insuredDto?: IInsuredDto): IInsuredVm => {
  if (!!insuredDto) {
    return {
      insuredUuid: toValueOrDefault(insuredDto.insured_uuid),
      dateOfBirth: toDateStringOrDefault(insuredDto.date_of_birth),
      covers: [],
    };
  } else {
    return {
      covers: [],
    };
  }
};

export const mapCoverDtoToVm = (
  coverCode: string,
  isWOP: boolean,
  coverDto?: ICoverDto,
  isHospital?: boolean,
  directionOfCalculation?: Direction
): ICoverVm => {
  if (!!coverDto) {
    return {
      checked: YesNo.Yes,
      code: coverCode,
      payments: toValueOrDefault(coverDto.payments),
      directionOfCalculation:
        directionOfCalculation ||
        toValueOrDefault(
          coverDto.direction_of_calculation,
          isWOP ? Direction.SumAssuredToPremium : undefined
        ),
      sumAssured: !isWOP ? toValueOrDefault(coverDto.sum_assured) : undefined,
      premiumPerFreq: toValueOrDefault(coverDto.premium_per_freq),
      duration: toValueOrDefault(coverDto.duration),
      idxOption: toValueOrDefault(
        coverDto.idx_option,
        isWOP ? YesNo.No : undefined
      ),
      addSumAssured: toValueOrDefault(
        isHospital
          ? coverDto.sum_assured && roundToDecimals(coverDto.sum_assured / 100)
          : coverDto.add_sum_assured
      ),
      expMatBen: toValueOrDefault(coverDto.exp_mat_ben),
      sumOfPremiums:
        coverDto.payments !== null && coverDto.premium_per_freq !== null
          ? coverDto.payments * coverDto.premium_per_freq
          : undefined,
    };
  } else {
    return {
      checked: YesNo.No,
      code: coverCode,
      directionOfCalculation: isWOP ? Direction.SumAssuredToPremium : undefined,
      idxOption: isWOP ? YesNo.No : undefined,
    };
  }
};

export const mapFundsToVm = (
  calculationDetailsDto: ICalculationDetailsDto,
  productFunds: IProductFund[],
  fundRiskProfiles: IFundRiskProfileConfig[] = []
): IFundContribution[] => {
  const calculatorFunds = keyBy(calculationDetailsDto.funds_list, "fund_code");

  return fundRiskProfiles.map((fundRiskProfile) => ({
    code: fundRiskProfile.code,
    nameEN: fundRiskProfile.name_en,
    namePL: fundRiskProfile.name_pl,
    notes: fundRiskProfile.notes,
    riskLevel: fundRiskProfile.risk_level,
    statusCode: fundRiskProfile.status_code,
    funds: productFunds
      .filter(
        (productFund) => productFund.fund_risk_profile === fundRiskProfile.code
      )
      .map((fund) => {
        const { guarantee_code, guarantee_name, guarantee_percentages } =
          fund.guarantees[0] ?? {};
        const guaranteePercentageAvailable =
          guarantee_percentages?.map(({ guarantee_percent }) =>
            String(guarantee_percent)
          ) ?? [];

        return {
          coverIdx: 1,
          fundCode: fund.fund_code,
          fundName: fund.fund_name,
          fundRiskProfile: fund.fund_risk_profile,
          fundOrder: fund.fund_order,
          allocationValue: toString(
            get(calculatorFunds, [fund.fund_code, "allocation_value"])
          ),
          allocationAmount: toString(
            get(calculatorFunds, [fund.fund_code, "allocation_amount"])
          ),
          guarantee: {
            guaranteeCode: guarantee_code,
            guaranteeName: guarantee_name,
            guaranteePercentageAvailable,
            guaranteeChecked: !!get(calculatorFunds, [
              fund.fund_code,
              "fund_gtees_list",
              "0",
            ])?.allocation_percent,
            guaranteeValue: toString(
              get(calculatorFunds, [fund.fund_code, "fund_gtees_list", "0"])
                ?.allocation_percent
            ),
          },
        };
      }),
  }));
};

export const toValueOrDefault = <T extends {}>(
  value: T | null,
  defaultValue?: T
): T | undefined => (value !== null ? value : defaultValue);

const toDateStringOrDefault = (
  value: string | null,
  defaultValue?: string
): string | undefined =>
  value !== null && moment(value).isValid()
    ? moment(value).format(dateFormat)
    : defaultValue;

const toYesNo = (value?: boolean) => (value ? YesNo.Yes : YesNo.No);

export default mapDtoToVm;
