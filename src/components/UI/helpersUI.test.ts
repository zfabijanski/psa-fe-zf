import { DataEntryMode } from "./helpersUI";

describe("helpersUI", () => {
  it("should have a DataEntryMode enum", () => {
    expect(DataEntryMode).toEqual({
      Gray: "GRAY",
      White: "WHITE",
    });
  });
});
