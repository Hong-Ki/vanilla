import styles from './Label.module.scss';

export interface Props {
  label: string;
  htmlFor?: string;
}

export default function ({ label, htmlFor }: Props): HTMLLabelElement {
  const labelElement = document.createElement('label');
  labelElement.textContent = label;
  labelElement.className = styles.label;

  if (htmlFor) labelElement.htmlFor = htmlFor;

  return labelElement;
}
