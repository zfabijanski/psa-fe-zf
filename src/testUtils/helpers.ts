export const sleep = (ms: number = 100): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, ms));
