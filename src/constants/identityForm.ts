export const PHONE_NUMBER_INPUT_PROPS = {
  label: '전화번호',
  placeholder: '010 1234 5678',
};
export const NOT_NUMBER_REGEXP = new RegExp(/[^0-9]/, 'gi');

export const IDENTITY_INPUT_PROPS = {
  label: '주민등록번호',
  placeholder: '850226-1',
};

export const NAME_INPUT_PROPS = {
  label: '이름',
  placeholder: '홍길동',
};

export const KOREAN_REGEXP_ALL = new RegExp(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/, 'gi');
export const KOREAN_REGEXP = new RegExp(/[^가-힣]/, 'gi');

export const TELECOM_SELECT_PROPS = {
  label: '통신사',
};

export const FORM_FAQ_MESSAGE =
  '모든 정보가 올바르게 입력되었음에도 인증번호 요청이 되지않는 경우 가입하신 통신사에 문의해주세요.';
