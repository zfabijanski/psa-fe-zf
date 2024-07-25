import { Role } from "models/common";
import mapDtoToVm, { mapFundsToVm, mapCoverDtoToVm } from "./dtoToVm";
import {
  createCalculationDetailsDto,
  createCalculatorCoversConfigMap,
  createProductConfigMap,
  createFundRiskProfileConfig,
  createProductCoversMap,
  createInsured,
  createProductFund,
  createCover,
} from "testUtils";
import { Direction } from "models/calculator";

describe("Mapping DTO to VM", () => {
  it("maps DTO to VM", () => {
    expect(
      mapDtoToVm(
        createCalculationDetailsDto(),
        createCalculatorCoversConfigMap(),
        createProductCoversMap(),
        createProductConfigMap(),
        [createFundRiskProfileConfig()]
      )
    ).toMatchSnapshot();
  });

  it('maps fund risk profile to "low" when fund risk profile is not found', () => {
    expect(
      mapDtoToVm(
        createCalculationDetailsDto(),
        createCalculatorCoversConfigMap(),
        createProductCoversMap(),
        createProductConfigMap(),
        []
      )
    ).toMatchSnapshot();
  });

  it("formats date of birth for insured person", () => {
    expect(
      mapDtoToVm(
        createCalculationDetailsDto({
          insureds_list: [
            createInsured({ date_of_birth: "2020-01-01", role: Role.MAIN }),
          ],
        }),
        createCalculatorCoversConfigMap(),
        createProductCoversMap(),
        createProductConfigMap(),
        [createFundRiskProfileConfig()]
      )
    ).toHaveProperty("mainInsured", {
      covers: [],
      dateOfBirth: "2020-01-01",
      insuredUuid: "insured_uuid",
    });
  });

  it("formats date of birth for policy holder", () => {
    expect(
      mapDtoToVm(
        createCalculationDetailsDto({
          insureds_list: [
            createInsured({ date_of_birth: "2020-01-01", role: Role.PH }),
          ],
        }),
        createCalculatorCoversConfigMap(),
        createProductCoversMap(),
        createProductConfigMap(),
        [createFundRiskProfileConfig()]
      )
    ).toHaveProperty("policyHolder", {
      covers: [],
      dateOfBirth: "2020-01-01",
      insuredUuid: "insured_uuid",
    });
  });

  it("formats date of birth for additional life assured", () => {
    expect(
      mapDtoToVm(
        createCalculationDetailsDto({
          insureds_list: [
            createInsured({ date_of_birth: "2020-01-01", role: Role.ALA }),
          ],
        }),
        createCalculatorCoversConfigMap(),
        createProductCoversMap(),
        createProductConfigMap(),
        [createFundRiskProfileConfig()]
      )
    ).toHaveProperty("additionalLifeAssureds", [
      {
        covers: [],
        dateOfBirth: "2020-01-01",
        insuredUuid: "insured_uuid",
      },
    ]);
  });
});

describe("Mapping funds to VM", () => {
  it("maps funds to VM", () => {
    expect(
      mapFundsToVm(
        createCalculationDetailsDto(),
        [createProductFund()],
        [createFundRiskProfileConfig()]
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "code": "code",
          "funds": Array [
            Object {
              "allocationAmount": "",
              "allocationValue": "",
              "coverIdx": 1,
              "fundCode": "fund_code",
              "fundName": "fund_name",
              "fundOrder": 1,
              "fundRiskProfile": "code",
              "guarantee": Object {
                "guaranteeChecked": false,
                "guaranteeCode": "guarantee_code",
                "guaranteeName": "guarantee_name",
                "guaranteePercentageAvailable": Array [
                  "10",
                ],
                "guaranteeValue": "",
              },
            },
          ],
          "nameEN": "name_en",
          "namePL": "name_pl",
          "notes": "notes",
          "riskLevel": 1,
          "statusCode": "status_code",
        },
      ]
    `);
  });
});

describe("Mapping covers to VM", () => {
  it('maps cover "amount" to VM', () => {
    expect(
      mapCoverDtoToVm(
        "cover_code",
        true,
        createCover(),
        false,
        Direction.SumAssuredToPremium
      )
    ).toMatchInlineSnapshot(`
      Object {
        "addSumAssured": 1,
        "checked": "Y",
        "code": "cover_code",
        "directionOfCalculation": "SA_TO_PREM",
        "duration": 1,
        "expMatBen": 1,
        "idxOption": "Y",
        "payments": 1,
        "premiumPerFreq": 1,
        "sumAssured": undefined,
        "sumOfPremiums": 1,
      }
    `);
  });
});
