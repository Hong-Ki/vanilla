import styles from './Input.module.scss';
import { createId } from '../../util/common';
import Label from '../Label/Label';
export interface Props extends CustomFormInput {
  placeholder?: string;
  type?: string;
  onChange?(e: Event): void;
}
export default ({
  defaultValue = '',
  type: elementType = 'text',
  label,
  id,
  name,
  onChange,
}: Props = {}): HTMLDivElement => {
  const fragment = new DocumentFragment();
  let elementId = id;

  if (label && !id) elementId = createId('input');

  if (label) {
    const labelElement = Label({ label, htmlFor: elementId });
    fragment.appendChild(labelElement);
  }

  const inputElement = document.createElement('input');
  inputElement.className = styles.selectbox;

  if (elementId) inputElement.id = elementId;
  if (name) inputElement.name = name;
  if (defaultValue) inputElement.value = defaultValue;
  if (elementType) inputElement.setAttribute('type', elementType);
  if (onChange) inputElement.addEventListener('change', onChange);
  fragment.appendChild(inputElement);

  const wrapperElement = document.createElement('div');
  wrapperElement.className = styles.wrapper;

  wrapperElement.appendChild(fragment);

  return wrapperElement;
};
