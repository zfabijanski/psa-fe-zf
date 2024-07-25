export interface IAttachment {
  id: number;
  name: string;
  isRemovable: boolean;
  isStateChanging: boolean;
}

export interface ISignature {
  companyName: string;
  email: string;
  name: string;
  pageURL: string;
  phoneNumber: string;
  position: string;
  surname: string;
  text1: string;
  text2: string;
}

export interface IFields {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  phone: string;
  pesel: string;
  passport: string;
  birthdate: string;
  content: string;
}

export type AdditionalField =
  | "lastName"
  | "phone"
  | "pesel"
  | "birthdate"
  | "passport";
