import styles from './Selectbox.module.scss';
import { createId } from '../../util/common';
import Label from '../Label/Label';
export interface Option {
  name: string;
  value: string | number;
}
export interface Props extends CustomFormInput {
  options?: Option[];
  onChange?(e: Event): void;
}
export default ({
  options,
  defaultValue,
  label,
  id,
  name,
  onChange,
}: Props = {}) => {
  const fragment = new DocumentFragment();

  const optionFragment = new DocumentFragment();
  if (options) {
    options.forEach(({ name, value }) => {
      const option = document.createElement('option');
      option.value = String(value);
      option.text = name;
      option.selected = value === defaultValue;

      optionFragment.appendChild(option);
    });
  }
  let elementId = id;

  if (label && !id) elementId = createId('label');

  if (label) {
    const labelComponent = Label({ htmlFor: elementId, label });
    fragment.appendChild(labelComponent);
  }

  const selectboxElement = document.createElement('select');
  selectboxElement.className = styles.selectbox;
  selectboxElement.appendChild(optionFragment);

  if (elementId) selectboxElement.id = elementId;
  if (name) selectboxElement.name = name;
  if (onChange) selectboxElement.addEventListener('change', onChange);

  fragment.appendChild(selectboxElement);

  const wrapperElement = document.createElement('div');
  wrapperElement.className = styles.wrapper || '';

  wrapperElement.appendChild(fragment);

  return wrapperElement;
};
