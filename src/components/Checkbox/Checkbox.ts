import styles from './Checkbox.module.scss';
import Label from '../Label/Label';
import { createId } from '../../util/common';

interface Props extends CustomFormInput {
  checked?: boolean;
}

export default function ({
  label,
  id,
  name,
  checked = false,
  onChange,
}: Props): HTMLDivElement {
  const fragment = new DocumentFragment();
  let elementId = id;

  const checkboxElement = document.createElement('input');
  checkboxElement.type = 'checkbox';
  if (onChange) checkboxElement.addEventListener('change', onChange);

  if (label && !id) {
    elementId = createId('checkbox');
    checkboxElement.id = elementId;
  }
  checkboxElement.checked = checked;
  if (elementId) checkboxElement.id = elementId;
  if (name) checkboxElement.name = name;

  fragment.appendChild(checkboxElement);

  if (label) {
    const labelElement = Label({ label, htmlFor: elementId });
    fragment.appendChild(labelElement);
  }

  const wrapperElement = document.createElement('div');
  wrapperElement.appendChild(fragment);
  wrapperElement.className = styles.wrapper;

  return wrapperElement;
}
