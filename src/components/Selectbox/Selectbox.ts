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
  let elementId = id;

  if (label && !id) elementId = createId('label');

  if (label) {
    const labelElement = Label({ htmlFor: elementId, label });
    fragment.appendChild(labelElement);
  }

  if (options) {
    options.forEach(({ name, value }) => {
      const option = document.createElement('option');
      option.value = String(value);
      option.text = name;
      option.selected = value === defaultValue;

      fragment.appendChild(option);
    });
  }

  const selectbox = document.createElement('select');
  selectbox.className = styles.selectbox;
  selectbox.appendChild(fragment);

  if (elementId) selectbox.id = elementId;
  if (name) selectbox.name = name;
  if (onChange) selectbox.addEventListener('change', onChange);

  return selectbox;
};
