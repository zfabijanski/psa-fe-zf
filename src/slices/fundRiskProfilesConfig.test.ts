import { createFundRiskProfileConfig } from "testUtils";
import { fundRiskProfilesConfigSlice } from "./fundRiskProfilesConfig";
import { AnyAction } from "@reduxjs/toolkit";

const {
  actions: {
    getFundRiskProfilesConfigRequested,
    getFundRiskProfilesConfigSuccess,
  },
  reducer: fundRiskProfilesConfig,
  getInitialState,
} = fundRiskProfilesConfigSlice;

describe("fundRiskProfilesConfig slice", () => {
  it("should return the initial state", () => {
    expect(fundRiskProfilesConfig(undefined, {} as AnyAction)).toEqual(
      getInitialState()
    );
  });

  it("should handle GetFundRiskProfilesConfigRequested action", () => {
    expect(
      fundRiskProfilesConfig(
        getInitialState(),
        getFundRiskProfilesConfigRequested()
      )
    ).toEqual({
      loaded: false,
      items: [],
    });
  });

  it("should handle GetFundRiskProfilesConfigSuccess action", () => {
    expect(
      fundRiskProfilesConfig(
        getInitialState(),
        getFundRiskProfilesConfigSuccess([
          createFundRiskProfileConfig({ code: "fund_risk_reducer_test" }),
        ])
      )
    ).toEqual({
      loaded: true,
      items: [createFundRiskProfileConfig({ code: "fund_risk_reducer_test" })],
    });
  });

  it("should sort items by risk level", () => {
    expect(
      fundRiskProfilesConfig(
        getInitialState(),
        getFundRiskProfilesConfigSuccess([
          createFundRiskProfileConfig({
            code: "fund_risk_reducer_test_1",
            risk_level: 1,
          }),
          createFundRiskProfileConfig({
            code: "fund_risk_reducer_test_3",
            risk_level: 3,
          }),
          createFundRiskProfileConfig({
            code: "fund_risk_reducer_test_2",
            risk_level: 2,
          }),
        ])
      )
    ).toEqual({
      loaded: true,
      items: [
        createFundRiskProfileConfig({
          code: "fund_risk_reducer_test_3",
          risk_level: 3,
        }),
        createFundRiskProfileConfig({
          code: "fund_risk_reducer_test_2",
          risk_level: 2,
        }),
        createFundRiskProfileConfig({
          code: "fund_risk_reducer_test_1",
          risk_level: 1,
        }),
      ],
    });
  });
});
