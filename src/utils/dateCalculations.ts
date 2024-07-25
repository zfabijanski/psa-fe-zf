import moment, { unitOfTime } from "moment";

export const dateFormat = "YYYY-MM-DD";

export const getAge = (
  dateOfBirth: string,
  unit: unitOfTime.Base = "years",
  format: string = dateFormat
) => moment().diff(moment(dateOfBirth, format), unit, true);
