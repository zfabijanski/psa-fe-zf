export const min = (
  ...values: Array<number | undefined>
): number | undefined => {
  const nonEmptyValues: number[] = values.filter<number>(
    (value): value is number => !!value
  );
  return nonEmptyValues.length > 0 ? Math.min(...nonEmptyValues) : undefined;
};
