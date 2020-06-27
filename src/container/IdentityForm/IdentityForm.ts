import styles from './IdentityForm.module.scss';
import Selectbox, { Option } from '../../components/Selectbox/Selectbox';
import { TELECOMS } from '../../constants/telecoms';
import Input from '../../components/Input/Input';
import Message from '../../components/Message/Message';
import TermsGroup from '../TermsGrop/TermsGroup';
import { isNumberOnly } from '../../util/common';
import { TERMS, REQUIRED_TERMS_IDS } from '../../constants/terms';
import {
  PHONE_NUMBER_INPUT_PROPS,
  NOT_NUMBER_REGEXP,
  IDENTITY_INPUT_PROPS,
  NAME_INPUT_PROPS,
  KOREAN_REGEXP_ALL,
  TELECOM_SELECT_PROPS,
  FORM_FAQ_MESSAGE,
} from '../../constants/identityForm';
import {
  Data,
  DataKey,
  checkAllValidation,
  checkPhoneNumber,
  checkIdentity,
  checkName,
} from '../../util/validation';
import {
  parseEventTargetToElement,
  parsePhoneNumber,
  parseRegisterNumber,
} from '../../util/parser';

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
  data.carrierCode = TELECOMS[0].code;

  const updateValidation = () => {
    const result = checkAllValidation(data, error);
    if (result) {
      submitElement.classList.remove(styles.disabled);
      submitElement.disabled = false;
    } else {
      submitElement.classList.add(styles.disabled);
      submitElement.disabled = true;
    }
  };

  const PhoneNumberInputComponent = Input({
    ...PHONE_NUMBER_INPUT_PROPS,
    onChange: e => {
      const { data: eventData } = e as InputEvent | { data: '' };
      const target = parseEventTargetToElement<HTMLInputElement>(e.target);
      const { value } = target;

      if (eventData && eventData.match(NOT_NUMBER_REGEXP)) {
        target.value = data.phoneNumber;
        return;
      }

      data.phoneNumber = value.replace(NOT_NUMBER_REGEXP, '');

      switch (data.phoneNumber.length) {
        case 0:
          error.set('phoneNumber', false);
        case 10:
          PhoneNumberInputComponent.classList.remove(styles.invalid);
          break;
        case 11:
          const next = IdentityInputComponent.querySelector('input');
          if (next) next.focus();
          break;
      }
    },
    onBlur: e => {
      if (!checkPhoneNumber(data.phoneNumber)) {
        PhoneNumberInputComponent.classList.add(styles.invalid);
        error.set('phoneNumber', false);
      } else {
        PhoneNumberInputComponent.classList.remove(styles.invalid);
        error.set('phoneNumber', true);

        const target = parseEventTargetToElement<HTMLInputElement>(e.target);
        target.value = parsePhoneNumber(target.value);
      }

      updateValidation();
    },
  });
  const IdentityInputComponent = Input({
    ...IDENTITY_INPUT_PROPS,
    onChange: e => {
      const { data: eventData } = e as InputEvent | { data: '' };
      const target = parseEventTargetToElement<HTMLInputElement>(e.target);
      const { value } = target;
      if (eventData && !isNumberOnly(eventData)) {
        target.value = data.registerNumber;
        return;
      }
      data.registerNumber = value.replace(NOT_NUMBER_REGEXP, '');

      if (data.registerNumber.length === 0) {
        IdentityInputComponent.classList.remove(styles.invalid);
      }
      if (data.registerNumber.length == 7) {
        IdentityInputComponent.classList.remove(styles.invalid);
        const next = NameInputComponent.querySelector('input');
        if (next) next.focus();
      }
    },
    onBlur: e => {
      const target = parseEventTargetToElement<HTMLInputElement>(e.target);
      target.value = parseRegisterNumber(data.registerNumber);
      if (checkIdentity(data.registerNumber)) {
        IdentityInputComponent.classList.remove(styles.invalid);
        error.set('registerNumber', true);
      } else {
        IdentityInputComponent.classList.add(styles.invalid);
        error.set('registerNumber', false);
      }

      updateValidation();
    },
  });
  const NameInputComponent = Input({
    ...NAME_INPUT_PROPS,
    onChange: e => {
      const { data: eventData } = e as InputEvent | { data: '' };
      const target = parseEventTargetToElement<HTMLInputElement>(e.target);
      const { value } = target;
      if (
        value.length > 10 ||
        (eventData && eventData.match(KOREAN_REGEXP_ALL))
      ) {
        target.value = data.name;
        return;
      }
      data.name = value;
    },
    onBlur: () => {
      if (checkName(data.name)) {
        NameInputComponent.classList.remove(styles.invalid);
        error.set('name', true);
      } else {
        NameInputComponent.classList.add(styles.invalid);
        error.set('name', false);
      }
      updateValidation();
    },
  });
  fragment.appendChild(
    Selectbox({
      ...TELECOM_SELECT_PROPS,
      options: TELECOMS.map<Option>(({ code, description }) => ({
        name: description,
        value: code,
      })),
      onChange: ({ target }) => {
        const { value } = parseEventTargetToElement<HTMLSelectElement>(target);
        data.carrierCode = value;

        const next = PhoneNumberInputComponent.querySelector('input');
        if (next) next.focus();

        updateValidation();
      },
    }),
  );
  fragment.appendChild(PhoneNumberInputComponent);
  fragment.appendChild(IdentityInputComponent);
  fragment.appendChild(NameInputComponent);
  fragment.appendChild(
    Message({
      message: FORM_FAQ_MESSAGE,
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
        } else {
          const termsCodeSet = new Set(data.termsCode);
          checked ? termsCodeSet.add(id) : termsCodeSet.delete(id);
          data.termsCode = [...termsCodeSet];

          const isCheckedRequiredTerms = REQUIRED_TERMS_IDS.reduce<boolean>(
            (acc, termsId) => (acc ? acc && termsCodeSet.has(termsId) : acc),
            true,
          );
          error.set('termsCode', isCheckedRequiredTerms);
        }

        updateValidation();
      },
    }),
  );
  const submitElement = document.createElement('button');
  submitElement.className = styles['submit-button'];
  submitElement.textContent = '인증번호 요청';
  updateValidation();

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
