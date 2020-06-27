import { parsePhoneNumber, parseRegisterNumber } from './parser';

describe('parsePhoneNumber Test', () => {
  test('10 digits number', () => {
    expect(parsePhoneNumber('0101231234')).toBe('010 123 1234');
  });
  test('11 digits number', () => {
    expect(parsePhoneNumber('01012341234')).toBe('010 1234 1234');
  });
  test('over digits number', () => {
    expect(parsePhoneNumber('01012341234123123')).toBe('010 1234 1234123123');
  });
  test('under digits number', () => {
    expect(parsePhoneNumber('01012')).toBe('010 12');
  });
});

describe('parseRegisterNumber Test', () => {
  test('7 digits number', () => {
    expect(parseRegisterNumber('1231231')).toBe('123123-1');
  });
  test('over digits number', () => {
    expect(parseRegisterNumber('12312311111')).toBe('123123-11111');
  });
  test('under digits number', () => {
    expect(parseRegisterNumber('12312')).toBe('12312');
  });
});
