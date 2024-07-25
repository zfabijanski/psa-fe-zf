export const range = (start: number, stop: number, step: number = 1) =>
  stop >= start
    ? Array.from(Array(stop - start).keys())
        .filter((value) => value % step === 0)
        .map((value) => value + start)
    : [];
