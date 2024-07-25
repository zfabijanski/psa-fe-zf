import React from "react";
import { render } from "testUtils";

import Start from "./Start";

jest.mock("../../components/UserCard", () => () => <div>UserCard</div>);

describe("Start", () => {
  it("calls correct methods when mounted", () => {
    const clearCurrentMeeting = jest.fn();
    const getMeetingsCounts = jest.fn();
    const resetDocuments = jest.fn();
    const resetMail = jest.fn();
    const resetProducts = jest.fn();
    const resetIllustrations = jest.fn();
    const resetCalculatorState = jest.fn();

    render(
      <Start
        clearCurrentMeeting={clearCurrentMeeting}
        getMeetingsCounts={getMeetingsCounts}
        resetDocuments={resetDocuments}
        resetMail={resetMail}
        resetProducts={resetProducts}
        resetIllustrations={resetIllustrations}
        resetCalculatorState={resetCalculatorState}
        canAddMeeting={true}
        showModal={jest.fn()}
        addMeeting={jest.fn()}
      />
    );

    expect(clearCurrentMeeting).toHaveBeenCalled();
    expect(getMeetingsCounts).toHaveBeenCalled();
    expect(resetDocuments).toHaveBeenCalled();
    expect(resetMail).toHaveBeenCalled();
    expect(resetProducts).toHaveBeenCalled();
    expect(resetIllustrations).toHaveBeenCalled();
    expect(resetCalculatorState).toHaveBeenCalled();
  });
});
