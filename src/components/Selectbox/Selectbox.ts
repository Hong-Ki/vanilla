import styles from './Selectbox.module.scss';
export interface Option {
  name: string;
  value: string | number;
}
export default (options: Option[] = [], defaultValue?: string) => {
  console.log(styles);
  const selectbox = document.createElement('select');
  selectbox.className = 'form__selectbox';

  options.forEach(({ name, value }) => {
    const option = document.createElement('option');
    option.value = String(value);
    option.text = name;
    option.selected = value === defaultValue;

    selectbox.appendChild(option);
  });

  return selectbox;
};
