import { NOT_NUMBER_REGEXP } from '../constants/identityForm';

export function createId(prefix = ''): string {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${prefix}_${s4()}${s4()}`;
}

export function isAllTrueMap(map: Map<string, boolean>): boolean {
  let result = true;

  for (let checked of map.values()) {
    result = result && checked;
    if (!result) return false;
  }

  return true;
}

export const isNumberOnly = (text: string) => {
  return text.match(NOT_NUMBER_REGEXP) === null;
};
