import styles from './Selectbox.module.scss';
export interface Option {
  name: string;
  value: string | number;
}
export interface Props {
  options: Option[];
  defaultValue?: string;
  onChange?(e: Event): void;
}
export default ({ options, defaultValue, onChange }: Props) => {
  const selectbox = document.createElement('select');
  selectbox.className = styles.selectbox;

  const fragment = new DocumentFragment();

  options.forEach(({ name, value }) => {
    const option = document.createElement('option');
    option.value = String(value);
    option.text = name;
    option.selected = value === defaultValue;

    fragment.appendChild(option);
  });

  selectbox.appendChild(fragment);

  if (onChange) selectbox.addEventListener('change', onChange);

  return selectbox;
};
