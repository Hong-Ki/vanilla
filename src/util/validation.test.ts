import {
  checkPhoneNumber,
  checkIdentity,
  checkName,
  checkAllValidation,
  Data,
  DataKey,
} from './validation';

describe('checkPhoneNumber Test', () => {
  test('10 digits phone number', () => {
    expect(checkPhoneNumber('0101231234')).toBeTruthy();
  });
  test('11 digits phone number', () => {
    expect(checkPhoneNumber('01012341234')).toBeTruthy();
  });
  test('over digits phone number', () => {
    expect(checkPhoneNumber('01012341234123123')).toBeFalsy();
  });
  test('under digits phone number', () => {
    expect(checkPhoneNumber('01012')).toBeFalsy();
  });
  test('text phone number', () => {
    expect(checkPhoneNumber('010-123-1234')).toBeFalsy();
  });
});

describe('checkIdentity Test', () => {
  test('7 digits number', () => {
    expect(checkIdentity('1231231')).toBeTruthy();
  });
  test('over 7 digits number', () => {
    expect(checkIdentity('12312311111')).toBeFalsy();
  });
  test('under 7 digits number', () => {
    expect(checkIdentity('12312')).toBeFalsy();
  });
});

describe('checkName Test', () => {
  test('korean text', () => {
    expect(checkName('한국어')).toBeTruthy();
  });
  test('korean text but, exist single', () => {
    expect(checkName('한국ㅇ')).toBeFalsy();
  });
  test('number text', () => {
    expect(checkName('12312')).toBeFalsy();
  });
  test('english text', () => {
    expect(checkName('Jim')).toBeFalsy();
  });
  test('Special Character text', () => {
    expect(checkName('!"@#"$')).toBeFalsy();
  });
});

describe('checkAllValidation Test', () => {
  const testData: Data = {
    name: '',
    registerNumber: '',
    carrierCode: '',
    phoneNumber: '',
    termsCode: [],
  };
  const testError = new Map<DataKey, boolean>();
  test('empty values', () => {
    expect(checkAllValidation(testData, testError)).toBeFalsy();
  });
  test('all checked Errors', () => {
    const otherTestData = Object.assign({}, testData, {
      name: '홍길동',
      registerNumber: '8303031',
      carrierCode: 'SKT',
      phoneNumber: '01012341234',
      termsCode: ['1', '3', '2'],
    } as Data);
    Object.keys(otherTestData).forEach(key =>
      testError.set(key as DataKey, true),
    );
    expect(checkAllValidation(otherTestData, testError)).toBeTruthy();
  });
  test('not checked just on Errors', () => {
    const otherTestData = Object.assign({}, testData, {
      name: '123',
      registerNumber: '8303031',
      carrierCode: 'SKT',
      phoneNumber: '01012341234',
      termsCode: ['1', '3', '2'],
    } as Data);
    testError.set('name', false);
    expect(checkAllValidation(otherTestData, testError)).toBeFalsy();
  });
});
