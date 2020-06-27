import { createId, isAllTrueMap, isNumberOnly } from './common';

const testPrefix = 'test';
describe('createId Test', () => {
  test('prefix Check', () => {
    const id = createId(testPrefix);

    expect(id.startsWith(testPrefix)).toBeTruthy();
  });
  test('id length test', () => {
    expect(createId(testPrefix).length).toBe(testPrefix.length + 9);
  });
});

describe('isAllTruMap Test', () => {
  test('return true Check', () => {
    const testMap = new Map();
    testMap.set('1', true);
    testMap.set('2', true);
    testMap.set('3', true);
    testMap.set('4', true);
    testMap.set('5', true);

    expect(isAllTrueMap(testMap)).toBeTruthy();
  });

  test('return false Check', () => {
    const testMap = new Map();
    testMap.set('1', true);
    testMap.set('2', true);
    testMap.set('3', true);
    testMap.set('4', false);
    testMap.set('5', true);

    expect(isAllTrueMap(testMap)).toBeFalsy();
  });
});

describe('isNumberOnly Test', () => {
  expect(isNumberOnly('010123')).toBeTruthy();
  expect(isNumberOnly('123 123')).toBeFalsy();
});
