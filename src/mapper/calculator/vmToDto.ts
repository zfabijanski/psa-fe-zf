import moment from "moment";
import {
  ICalculationVM,
  ICover as ICoverVm,
  IFundContribution,
  IInsured as IInsuredVm,
} from "../../features/Calculator/types";
import {
  Frequency,
  InvestmentProfile,
  ProductCategory,
  Role,
} from "../../models/common";
import {
  Direction,
  ICalculationDto,
  ICover as ICoverDto,
  IFund as IFundDto,
  IInsured as IInsuredDto,
  YesNo,
} from "models/calculator";
import { dateFormat } from "../../utils/dateCalculations";
import { Indexer } from "../../utils/indexer";

const mapVmToDto = (calculationVM: ICalculationVM): ICalculationDto => {
  const coversIndexer = new Indexer(1);
  const insuredsIndexer = new Indexer(1);

  const mainInsured = mapInsuredVmToDto(
    calculationVM.mainInsured,
    calculationVM.policyHolderIsMainInsured === YesNo.Yes
      ? Role.MAIN_PH
      : Role.MAIN,
    insuredsIndexer.getNext()
  );
  const mainCover = mapCoverVmToDto(
    calculationVM.mainCover,
    coversIndexer.getNext(),
    insuredsIndexer.lastIndex,
    calculationVM.frequencyCode,
    calculationVM.productCategories.includes(ProductCategory.Child),
    calculationVM.indexation,
    calculationVM.ropOption,
    calculationVM.investmentProfile
  );
  const additionalCovers = mapCoversVmToDto(
    calculationVM.additionalCovers,
    coversIndexer,
    insuredsIndexer.lastIndex,
    calculationVM.frequencyCode
  );
  const mainInsuredChildCovers = mapCoversVmToDto(
    calculationVM.mainInsured.covers,
    coversIndexer,
    insuredsIndexer.lastIndex,
    calculationVM.frequencyCode
  );
  const policyHolder =
    calculationVM.policyHolderIsMainInsured !== YesNo.Yes
      ? mapInsuredVmToDto(
          calculationVM.policyHolder,
          (calculationVM.wopCovers || []).some(
            (cover) => cover.checked === YesNo.Yes
          ) && calculationVM.productCategories.includes(ProductCategory.Child)
            ? Role.ALA_PH
            : Role.PH,
          insuredsIndexer.getNext()
        )
      : undefined;
  const wopCovers = mapCoversVmToDto(
    calculationVM.wopCovers,
    coversIndexer,
    insuredsIndexer.lastIndex,
    calculationVM.frequencyCode
  );
  const additionalLifeAssureds: IInsuredDto[] = [];
  const additionalLifeAssuredsChildCovers: ICoverDto[] = [];
  (calculationVM.additionalLifeAssureds || []).forEach((child) => {
    additionalLifeAssureds.push(
      mapInsuredVmToDto(child, Role.ALA, insuredsIndexer.getNext())
    );
    additionalLifeAssuredsChildCovers.push(
      ...mapCoversVmToDto(
        child.covers,
        coversIndexer,
        insuredsIndexer.lastIndex,
        calculationVM.frequencyCode
      )
    );
  });

  const covers: ICoverDto[] = [
    mainCover,
    ...additionalCovers,
    ...mainInsuredChildCovers,
    ...wopCovers,
    ...additionalLifeAssuredsChildCovers,
  ];
  const insureds: IInsuredDto[] = [
    mainInsured,
    ...(policyHolder ? [policyHolder] : []),
    ...additionalLifeAssureds,
  ];

  const funds: IFundDto[] = mapFundsVmToDto(calculationVM.fundContributions);

  return {
    uuid: "123", // TODO: Set uuid, version and source_system properly
    version: "456",
    source_system: "FE",
    product_guid: calculationVM.productGuid,
    covers_list: covers,
    insureds_list: insureds,
    funds_list: funds,
  };
};

const mapCoversVmToDto = (
  coversVm: ICoverVm[] | undefined,
  indexer: Indexer,
  insuredIndex: number,
  frequencyCode?: Frequency
): ICoverDto[] => {
  return (coversVm || [])
    .filter((cover) => cover.checked === YesNo.Yes)
    .map((cover) =>
      mapCoverVmToDto(cover, indexer.getNext(), insuredIndex, frequencyCode)
    );
};

const mapInsuredVmToDto = (
  insuredVm: IInsuredVm,
  role: Role,
  insuredIndex: number
): IInsuredDto => {
  return {
    insured_idx: insuredIndex,
    insured_uuid: toValueOrNull(insuredVm.insuredUuid),
    age_in_months: null,
    date_of_birth: toISOStringOrNull(insuredVm.dateOfBirth),
    role,
  };
};

const mapCoverVmToDto = (
  coverVm: ICoverVm,
  coverIndex: number,
  insuredIndex: number,
  frequencyCode?: Frequency,
  isChildMainCover?: boolean,
  indexation?: YesNo,
  ropOption?: YesNo,
  investmentProfile?: InvestmentProfile
): ICoverDto => {
  return {
    cover_idx: coverIndex,
    insured_idx: insuredIndex,
    code: coverVm.code,
    frequency_code: toValueOrNull(frequencyCode),
    payments: toValueOrNull(coverVm.payments),
    direction_of_calculation: toValueOrNull(coverVm.directionOfCalculation),
    investment_profile: toValueOrNull(investmentProfile),
    indexation: toValueOrNull(indexation),
    sum_assured: toValueOrNull(
      coverVm.sumAssured,
      coverVm.directionOfCalculation === Direction.SumAssuredToPremium
    ),
    premium_per_freq: toValueOrNull(
      coverVm.premiumPerFreq,
      coverVm.directionOfCalculation === Direction.PremiumToSumAssured
    ),
    duration: toValueOrNull(coverVm.duration),
    idx_option: toValueOrNull(coverVm.idxOption),
    rop_option: toValueOrNull(ropOption),
    add_sum_assured: toValueOrNull(
      coverVm.addSumAssured,
      isChildMainCover ||
        coverVm.directionOfCalculation === Direction.SumAssuredToPremium
    ),
    ending_age: null,
    exp_mat_ben: toValueOrNull(
      coverVm.expMatBen,
      coverVm.directionOfCalculation === Direction.MaturityBenefitToPremium
    ),
  };
};

export const mapFundsVmToDto = (
  fundContributions: Array<Partial<IFundContribution>>
): IFundDto[] => {
  const funds = fundContributions.map((x) => x.funds).flat();

  return funds.map((fund) => ({
    cover_idx: fund?.coverIdx || 1,
    allocation_value: Number(fund?.allocationValue) || 0,
    fund_code: toValueOrNull(fund?.fundCode),
    fund_risk_profile: toValueOrNull(fund?.fundRiskProfile),
    fund_gtees_list: fund?.guarantee?.guaranteeChecked
      ? [
          {
            allocation_percent: Number(fund?.guarantee.guaranteeValue),
            gtee_code: fund?.guarantee.guaranteeCode,
          },
        ]
      : null,
  }));
};

const toValueOrNull = <T extends {}>(
  value: T | undefined,
  condition: boolean = true
) => (condition ? value || null : null);

const toISOStringOrNull = (value?: string) =>
  value ? moment(value, dateFormat).utc(true).toISOString() : null;

export default mapVmToDto;
