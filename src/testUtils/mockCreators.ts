import {
  ICalculatorCoversConfig,
  IProductCovers,
} from "features/Calculator/types";
import {
  DocumentState,
  IDirectory,
  IDirectoryMetadata,
  IDocumentMetadata,
} from "features/Library/types";
import { IMeeting } from "features/Meeting/History/types";
import { IIllustration, ProductGuid } from "features/Products/types";
import { IModalData, ModalTypes } from "models/Modal";
import {
  Frequency,
  IFundRiskProfileConfig,
  IProductConfig,
  IProductFund,
  IProductGuarantee,
  InvestmentProfile,
  Role,
} from "models/common";
import {
  CalculationStatus,
  Direction,
  ICalculationDetailsDto,
  ICover,
  IInsured,
  YesNo,
} from "models/calculator";

export const createCalculationDetailsDto = (
  overrides?: Partial<ICalculationDetailsDto>
): ICalculationDetailsDto => ({
  calculation_id: 1,
  working_date: "2020-01-01",
  premiums_total: 100,
  guaranteed_death_benefit: 100,
  guaranteed_maturity_benefit: 100,
  projected_maturity_value_egr_m: 100,
  product_categories: [],
  uuid: "uuid",
  version: "version",
  source_system: "source_system",
  product_guid: 1,
  insureds_list: [],
  covers_list: [],
  funds_list: [],
  ...overrides,
});

export const createInsured = (overrides?: Partial<IInsured>): IInsured => ({
  insured_idx: 1,
  insured_uuid: "insured_uuid",
  age_in_months: 1,
  date_of_birth: "2020-01-01",
  role: Role.MAIN,
  ...overrides,
});

export const createCover = (overrides?: Partial<ICover>): ICover => ({
  cover_id: 1,
  cover_idx: 1,
  insured_idx: 1,
  code: "code",
  frequency_code: Frequency.Annually,
  payments: 1,
  direction_of_calculation: Direction.SumAssuredToPremium,
  investment_profile: InvestmentProfile.Balanced,
  indexation: YesNo.Yes,
  sum_assured: 1,
  premium_per_freq: 1,
  duration: 1,
  idx_option: YesNo.Yes,
  rop_option: YesNo.Yes,
  add_sum_assured: 1,
  ending_age: 1,
  exp_mat_ben: 1,
  ...overrides,
});

export const createCalculatorCoversConfig = (
  overrides?: Partial<ICalculatorCoversConfig>
): ICalculatorCoversConfig => ({
  coverName: "coverName",
  isChild: false,
  isHospital: false,
  ...overrides,
});

export const createCalculatorCoversConfigMap = (
  overrides?: Partial<Record<string, ICalculatorCoversConfig>>
): Record<string, ICalculatorCoversConfig> => ({
  coverName1: createCalculatorCoversConfig({ coverName: "coverName1" }),
  coverName2: createCalculatorCoversConfig({ coverName: "coverName2" }),
  ...overrides,
});

export const createProductCovers = (
  overrides?: Partial<IProductCovers>
): IProductCovers => ({
  mainCover: "mainCover",
  additionalCovers: ["additionalCover1", "additionalCover2"],
  wopCovers: ["wopCover1", "wopCover2"],
  childCovers: ["childCover1", "childCover2"],
  ...overrides,
});

export const createProductCoversMap = (
  overrides?: Partial<Record<string, IProductCovers>>
): Record<string, IProductCovers> => ({
  mainCover1: createProductCovers({ mainCover: "mainCover1" }),
  mainCover2: createProductCovers({ mainCover: "mainCover2" }),
  ...overrides,
});

export const createProductConfig = (
  overrides?: Partial<IProductConfig>
): IProductConfig => ({
  product_guid: 1,
  product_name: "product_name",
  product_categories: [],
  product_freqs: [],
  product_covers: [],
  product_funds: [],
  ...overrides,
});

export const createProductConfigMap = (
  overrides?: Partial<Record<string, IProductConfig>>
): Record<string, IProductConfig> => ({
  1: createProductConfig({ product_name: "product_name1" }),
  2: createProductConfig({ product_name: "product_name2" }),
  ...overrides,
});

export const createFundRiskProfileConfig = (
  overrides?: Partial<IFundRiskProfileConfig>
): IFundRiskProfileConfig => ({
  code: "code",
  name_pl: "name_pl",
  name_en: "name_en",
  risk_level: 1,
  status_code: "status_code",
  notes: "notes",
  ...overrides,
});

export const createProductGuarantee = (
  overrides?: Partial<IProductGuarantee>
): IProductGuarantee => ({
  guarantee_code: "guarantee_code",
  guarantee_name: "guarantee_name",
  guarantee_min_value: "1",
  guarantee_duration_months: "4",
  guarantee_percentages: [{ guarantee_percent: 10 }],
  ...overrides,
});

export const createProductFund = (
  overrides?: Partial<IProductFund>
): IProductFund => ({
  cover_code: "cover_code",
  fund_code: "fund_code",
  fund_name: "fund_name",
  fund_risk_profile: "code",
  fund_order: 1,
  guarantees: [createProductGuarantee()],
  ...overrides,
});

export const createModalData = (
  overrides: Partial<IModalData> = {}
): IModalData => ({
  modalIllustration: "alert-fill",
  modalTitleTrKey: "modalTitleTrKey",
  modalContentTrKey: "modalContentTrKey",
  modalContent: "modalContent",
  modalButtons: {
    confirm: { textTrKey: "modal.ok" },
  },
  modalType: ModalTypes.default,
  maskClosable: true,
  ...overrides,
});

export const createIllustration = (
  overrides: Partial<IIllustration> = {}
): IIllustration => ({
  idd_id: 1,
  product_guid: ProductGuid.Savings,
  adequacy_id: 1,
  order_id: 1,
  expected_amount: { value: 3 },
  premium_total: { value: 3 },
  duration: { value: 3 },
  premium_main_cover: { value: 3 },
  frequency: { value: 3 },
  sum_of_premiums: { value: 3 },
  sum_assured: { value: 3 },
  investment_profile: { value: 3 },
  pru_calc_calculation_id: 1,
  status: CalculationStatus.Illustrated,
  json_needs_analysis: null,
  ...overrides,
});

export const createDirectory = (
  overrides?: Partial<IDirectory>
): IDirectory => ({
  directoryId: 1,
  directories: [],
  documentsIds: [1, 2, 3],
  ...overrides,
});

export const createDirectoryMetadata = (
  overrides?: Partial<IDirectoryMetadata>
): IDirectoryMetadata => ({
  directoryId: 1,
  name: "name",
  isOpen: false,
  ...overrides,
});

export const createDocumentMetadata = (
  overrides?: Partial<IDocumentMetadata>
): IDocumentMetadata => ({
  documentId: 1,
  guid: "guid",
  name: "name",
  state: DocumentState.NotAttached,
  isStateChanging: false,
  moduleName: "PRU_LIBRARY",
  ...overrides,
});

export const createMeeting = (overrides?: Partial<IMeeting>): IMeeting => ({
  meetingNo: "meetingNo",
  meetingId: 1,
  name: "name",
  age: 18,
  lastAccessDate: new Date("2023-01-01"),
  createDate: new Date("2023-01-01"),
  statusId: 1,
  statusName: "statusName",
  statusDescription: "statusDescription",
  state: "state",
  haveAdequacy: false,
  haveCalculation: false,
  haveIdd: false,
});
