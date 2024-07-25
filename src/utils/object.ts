type FlatObjectValueType =
  | string
  | number
  | boolean
  | null
  | Date
  | object
  | undefined;

export const flatObject = <T extends Record<string, FlatObjectValueType>>(
  value: T,
  result: Record<string, FlatObjectValueType>,
  name?: keyof T
) => {
  if (typeof value === "object") {
    const prefix = name ? `${String(name)}_` : "";
    Object.keys(value).forEach((key) =>
      flatObject(value[key] as T, result, `${prefix}${key}`)
    );
  } else if (name) {
    result[String(name)] = value;
  }
};
