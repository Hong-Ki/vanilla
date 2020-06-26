import styles from './IdentityForm.module.scss';
import Selectbox, { Option } from '../../components/Selectbox/Selectbox';
import { TELECOMS } from '../../constants/telecoms';
import Input from '../../components/Input/Input';
import Message from '../../components/Message/Message';
import TermsGroup from '../TermsGrop/TermsGroup';
import { parseEventTargetToElement } from '../../util/common';
import { TERMS, REQUIRED_TERMS_IDS } from '../../constants/terms';

interface Data {
  name: string;
  registerNumber: string;
  carrierCode: string;
  phoneNumber: string;
  termsCode: string[];
}
type DataKey = keyof Data;
interface Props {
  onSubmit?(data: Data): void;
}

export default function ({ onSubmit }: Props = {}): HTMLFormElement {
  const fragment = new DocumentFragment();
  const data: Data = {
    name: '',
    registerNumber: '',
    carrierCode: '',
    phoneNumber: '',
    termsCode: [],
  };
  const error = new Map<DataKey, boolean>();
  error.set('carrierCode', true);

  const checkValidations = (): void => {
    const result = Object.entries(data).reduce((acc, [key, value]) => {
      return (acc =
        (error.get(key as DataKey) || false) && acc && value.length > 0);
    }, true);
    if (result) {
      submitElement.classList.remove(styles.disabled);
      submitElement.disabled = false;
    } else {
      submitElement.classList.add(styles.disabled);
      submitElement.disabled = true;
    }
  };

  const TelInputComponent = Input({
    label: '전화번호',
    placeholder: '010 1234 5678',
    onChange: e => {
      const { data: eventData } = e as InputEvent | { data: '' };
      const { value = '' } = parseEventTargetToElement<HTMLInputElement>(
        e.target,
      );

      if (eventData && eventData.match(new RegExp(/[^0-9]/, 'gi'))) {
        parseEventTargetToElement<HTMLInputElement>(e.target).value =
          data.phoneNumber;
        return;
      }
      data.phoneNumber = value.replace(/[^0-9]/gi, '');

      switch (data.phoneNumber.length) {
        case 0:
          TelInputComponent.classList.remove(styles.invalid);
          break;
        case 3:
        case 6:
          parseEventTargetToElement<HTMLInputElement>(
            e.target,
          ).value = `${value} `;
          break;
        case 10:
          TelInputComponent.classList.remove(styles.invalid);
          break;
        case 11:
          parseEventTargetToElement<HTMLInputElement>(
            e.target,
          ).value = `${data.phoneNumber.substring(
            0,
            3,
          )} ${data.phoneNumber.substring(3, 7)} ${data.phoneNumber.substring(
            7,
          )}`;
          const next = IdentityInputComponent.querySelector('input');
          if (next) next.focus();
          break;
      }
    },
    onBlur: () => {
      const { length } = data.phoneNumber;
      if (length < 10 || length > 11) {
        TelInputComponent.classList.add(styles.invalid);
        error.set('phoneNumber', false);
        return;
      }
      checkValidations();
      error.set('phoneNumber', true);
      TelInputComponent.classList.remove(styles.invalid);
    },
  });
  const IdentityInputComponent = Input({
    label: '주민등록번호',
    type: 'text',
    placeholder: '850226-1',
    onChange: e => {
      const { data: eventData } = e as InputEvent | { data: '' };
      const { value = '' } = parseEventTargetToElement<HTMLInputElement>(
        e.target,
      );

      if (eventData && eventData.match(new RegExp(/[^0-9]/, 'gi'))) {
        parseEventTargetToElement<HTMLInputElement>(e.target).value =
          data.registerNumber;
        return;
      }
      data.registerNumber = value.replace(/[^0-9]/gi, '');
      switch (data.registerNumber.length) {
        case 0:
          IdentityInputComponent.classList.remove(styles.invalid);
          break;
        case 6:
          parseEventTargetToElement<HTMLInputElement>(
            e.target,
          ).value = `${value}-`;
          break;
        case 7:
          const next = NameInputComponent.querySelector('input');
          if (next) next.focus();
          break;
      }
    },
    onBlur: () => {
      const { length } = data.registerNumber;
      if (length !== 7) {
        IdentityInputComponent.classList.add(styles.invalid);
        error.set('registerNumber', false);
        return;
      }
      error.set('registerNumber', true);
      IdentityInputComponent.classList.remove(styles.invalid);
    },
  });
  const NameInputComponent = Input({
    label: '이름',
    type: 'name',
    placeholder: '홍길동',
    onChange: e => {
      const { data: eventData } = e as InputEvent | { data: '' };
      const { value = '' } = parseEventTargetToElement<HTMLInputElement>(
        e.target,
      );
      if (
        value.length > 10 ||
        (eventData && eventData.match(new RegExp(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/, 'gi')))
      ) {
        parseEventTargetToElement<HTMLInputElement>(e.target).value = data.name;
        return;
      }
      data.name = value;
    },
    onBlur: () => {
      if (data.name.match(new RegExp(/[^가-힣]/, 'gi'))) {
        NameInputComponent.classList.add(styles.invalid);
        error.set('name', false);
        return;
      }
      error.set('name', true);
      NameInputComponent.classList.remove(styles.invalid);
    },
  });
  fragment.appendChild(
    Selectbox({
      label: '통신사',
      options: TELECOMS.map<Option>(({ code, description }) => ({
        name: description,
        value: code,
      })),
      onChange: ({ target }) => {
        const { value } = parseEventTargetToElement<HTMLSelectElement>(target);
        data.carrierCode = value;
        const next = TelInputComponent.querySelector('input');
        if (next) next.focus();
      },
    }),
  );
  data.carrierCode = TELECOMS[0].code;
  fragment.appendChild(TelInputComponent);
  fragment.appendChild(IdentityInputComponent);
  fragment.appendChild(NameInputComponent);
  fragment.appendChild(
    Message({
      message:
        '모든 정보가 올바르게 입력되었음에도 인증번호 요청이 되지않는 경우 가입하신 통신사에 문의해주세요.',
    }),
  );
  fragment.appendChild(
    TermsGroup({
      onChange: (e, isChangeAll) => {
        const { checked, id } = parseEventTargetToElement<HTMLInputElement>(
          e.target,
        );
        if (isChangeAll) {
          if (checked) {
            data.termsCode = TERMS.map<string>(({ termsId }) => termsId);
            error.set('termsCode', true);
          } else {
            data.termsCode = [];
            error.set('termsCode', false);
          }
          checkValidations();
          return;
        }
        const termsCodeSet = new Set(data.termsCode);
        checked ? termsCodeSet.add(id) : termsCodeSet.delete(id);
        data.termsCode = [...termsCodeSet];

        const isCheckedRequiredTerms = REQUIRED_TERMS_IDS.reduce<boolean>(
          (acc, termsId) => (acc ? acc && termsCodeSet.has(termsId) : acc),
          true,
        );
        error.set('termsCode', isCheckedRequiredTerms);

        checkValidations();
      },
    }),
  );
  const submitElement = document.createElement('button');
  submitElement.className = styles['submit-button'];
  submitElement.textContent = '인증번호 요청';
  checkValidations();

  fragment.appendChild(submitElement);

  const formElement = document.createElement('form');
  if (onSubmit)
    formElement.addEventListener('submit', function (e) {
      e.preventDefault();
      onSubmit(data);
    });

  formElement.appendChild(fragment);
  return formElement;
}
