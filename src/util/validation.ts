import { isNumberOnly } from './common';
import { KOREAN_REGEXP } from '../constants/identityForm';

export const checkPhoneNumber = (data: string) => {
  const { length } = data;
  return length >= 10 && length <= 11 && isNumberOnly(data);
};

export const checkIdentity = (data: string) => {
  return data.length === 7;
};

export const checkName = (data: string) => {
  return !data.match(KOREAN_REGEXP);
};

export interface Data {
  name: string;
  registerNumber: string;
  carrierCode: string;
  phoneNumber: string;
  termsCode: string[];
}

export type DataKey = keyof Data;

export const checkAllValidation = (
  data: Data,
  error: Map<DataKey, boolean>,
) => {
  return Object.entries(data).reduce<boolean>((acc, [key, value]) => {
    return acc
      ? acc && value.length > 0 && (error.get(key as DataKey) || false)
      : acc;
  }, true);
};
